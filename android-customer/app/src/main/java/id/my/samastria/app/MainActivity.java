package id.my.samastria.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.CookieManager;
import android.widget.Toast;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends Activity {
    private static final String UPDATE_INFO_URL = "https://samastria.my.id/app-update/customer.json";
    private static final String PREFS = "samastria_update";
    private static final String KEY_DOWNLOAD_ID = "download_id";

    private WebView webView;
    private ProgressBar progressBar;
    private FrameLayout container;
    private View splashView;
    private final Handler handler = new Handler();
    private BroadcastReceiver downloadReceiver;
    private boolean updateCheckStarted = false;
    private float touchStartY;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        container = new FrameLayout(this);
        container.setBackgroundColor(Color.WHITE);

        webView = new WebView(this);
        webView.setLayoutParams(new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        FrameLayout.LayoutParams progressParams = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, 8, Gravity.TOP);
        progressBar.setLayoutParams(progressParams);
        progressBar.setMax(100);
        progressBar.setProgress(0);
        progressBar.setVisibility(View.GONE);

        FrameLayout splash = new FrameLayout(this);
        splash.setBackgroundColor(Color.rgb(20, 115, 75));
        TextView splashText = new TextView(this);
        splashText.setText("SAMASTRIA\\n\\nBelanja mudah, nyaman, dan terpercaya");
        splashText.setTextColor(Color.WHITE);
        splashText.setTextSize(22);
        splashText.setGravity(Gravity.CENTER);
        splashText.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        splash.addView(splashText, new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        splashView = splash;

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setSupportMultipleWindows(false);
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme();
                if ("http".equalsIgnoreCase(scheme) || "https".equalsIgnoreCase(scheme)) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); } catch (Exception ignored) {}
                return true;
            }
        });
        webView.setOnTouchListener((view, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_DOWN) {
                touchStartY = event.getY();
            } else if (event.getAction() == android.view.MotionEvent.ACTION_UP
                && webView.getScrollY() == 0
                && event.getY() - touchStartY > 120) {
                webView.reload();
                return true;
            }
            return false;
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                progressBar.setVisibility(newProgress >= 100 ? View.GONE : View.VISIBLE);
            }
        });
        CookieManager.getInstance().setAcceptCookie(true);

        container.addView(webView);
        container.addView(progressBar);
        container.addView(splashView);
        setContentView(container);
        registerDownloadReceiver();

        if (savedInstanceState == null) {
            handler.postDelayed(() -> {
                if (isFinishing() || isDestroyed()) return;
                if (splashView != null) {
                    container.removeView(splashView);
                    splashView = null;
                }
                webView.loadUrl("https://samastria.my.id/");
            }, 1500);
        } else {
            container.removeView(splashView);
            splashView = null;
            webView.restoreState(savedInstanceState);
        }
        checkForUpdate();
    }

    private void checkForUpdate() {
        if (updateCheckStarted) return;
        updateCheckStarted = true;
        new Thread(() -> {
            HttpURLConnection connection = null;
            try {
                connection = (HttpURLConnection) new URL(UPDATE_INFO_URL).openConnection();
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(10000);
                connection.setReadTimeout(10000);
                connection.setUseCaches(false);
                connection.setRequestProperty("Cache-Control", "no-cache");
                if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) return;

                StringBuilder body = new StringBuilder();
                try (InputStream input = connection.getInputStream();
                     BufferedReader reader = new BufferedReader(new InputStreamReader(input, "UTF-8"))) {
                    String line;
                    while ((line = reader.readLine()) != null) body.append(line);
                }

                JSONObject info = new JSONObject(body.toString());
                int latestCode = info.getInt("versionCode");
                String latestName = info.optString("versionName", "");
                String apkUrl = info.getString("apkUrl");
                String notes = info.optString("releaseNotes", "Pembaruan aplikasi Samastria tersedia.");
                boolean mandatory = info.optBoolean("mandatory", false);
                Uri apkUri = Uri.parse(apkUrl);
                if (!"https".equalsIgnoreCase(apkUri.getScheme())
                    || !"samastria.my.id".equalsIgnoreCase(apkUri.getHost())) return;

                if (latestCode > getInstalledVersionCode()) {
                    runOnUiThread(() -> showUpdateDialog(latestName, notes, apkUrl, mandatory));
                }
            } catch (Exception ignored) {
                // Server tidak tersedia: aplikasi tetap berjalan seperti biasa.
            } finally {
                if (connection != null) connection.disconnect();
            }
        }).start();
    }

    private long getInstalledVersionCode() {
        try {
            PackageInfo info = getPackageManager().getPackageInfo(getPackageName(), 0);
            if (Build.VERSION.SDK_INT >= 28) return info.getLongVersionCode();
            return info.versionCode;
        } catch (Exception e) { return 0L; }
    }

    private void showUpdateDialog(String version, String notes, String apkUrl, boolean mandatory) {
        if (isFinishing() || isDestroyed()) return;
        AlertDialog.Builder builder = new AlertDialog.Builder(this)
            .setTitle("Pembaruan Samastria tersedia")
            .setMessage("Versi terbaru: " + version + "\\n\\n" + notes)
            .setPositiveButton("Update Sekarang", (dialog, which) -> startApkDownload(apkUrl));
        if (!mandatory) builder.setNegativeButton("Nanti", (dialog, which) -> dialog.dismiss());
        AlertDialog dialog = builder.create();
        dialog.setCancelable(!mandatory);
        dialog.show();
    }

    private void startApkDownload(String apkUrl) {
        try {
            Uri uri = Uri.parse(apkUrl);
            if (!"https".equalsIgnoreCase(uri.getScheme())
                || !"samastria.my.id".equalsIgnoreCase(uri.getHost())) {
                Toast.makeText(this, "Alamat pembaruan tidak valid.", Toast.LENGTH_LONG).show();
                return;
            }
            DownloadManager.Request request = new DownloadManager.Request(uri);
            request.setTitle("Pembaruan Samastria");
            request.setDescription("Mengunduh aplikasi Samastria versi terbaru");
            request.setMimeType("application/vnd.android.package-archive");
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            request.setDestinationInExternalFilesDir(this, Environment.DIRECTORY_DOWNLOADS,
                "Samastria-Pelanggan-update.apk");
            DownloadManager manager = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            long id = manager.enqueue(request);
            getSharedPreferences(PREFS, MODE_PRIVATE).edit().putLong(KEY_DOWNLOAD_ID, id).apply();
            Toast.makeText(this, "Pembaruan sedang diunduh.", Toast.LENGTH_LONG).show();
        } catch (Exception e) {
            Toast.makeText(this, "Gagal memulai unduhan pembaruan.", Toast.LENGTH_LONG).show();
        }
    }

    private void registerDownloadReceiver() {
        downloadReceiver = new BroadcastReceiver() {
            @Override public void onReceive(Context context, Intent intent) {
                long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1L);
                long saved = getSharedPreferences(PREFS, MODE_PRIVATE).getLong(KEY_DOWNLOAD_ID, -1L);
                if (id == saved && id != -1L) installDownloadedApk();
            }
        };
        IntentFilter filter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        if (Build.VERSION.SDK_INT >= 33) registerReceiver(downloadReceiver, filter, Context.RECEIVER_NOT_EXPORTED);
        else registerReceiver(downloadReceiver, filter);
    }

    private void installDownloadedApk() {
        long id = getSharedPreferences(PREFS, MODE_PRIVATE).getLong(KEY_DOWNLOAD_ID, -1L);
        if (id == -1L) return;
        DownloadManager manager = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
        try (android.database.Cursor cursor = manager.query(new DownloadManager.Query().setFilterById(id))) {
            if (cursor == null || !cursor.moveToFirst()) return;
            int statusColumn = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
            if (statusColumn < 0 || cursor.getInt(statusColumn) != DownloadManager.STATUS_SUCCESSFUL) return;
        } catch (Exception e) { return; }

        if (Build.VERSION.SDK_INT >= 26 && !getPackageManager().canRequestPackageInstalls()) {
            new AlertDialog.Builder(this)
                .setTitle("Izinkan pemasangan pembaruan")
                .setMessage("Izinkan Samastria memasang pembaruan dari unduhan aplikasi.")
                .setPositiveButton("Buka Pengaturan", (dialog, which) -> {
                    Intent settings = new Intent(android.provider.Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                        Uri.parse("package:" + getPackageName()));
                    startActivity(settings);
                }).setNegativeButton("Nanti", null).show();
            return;
        }

        Uri apkUri = manager.getUriForDownloadedFile(id);
        if (apkUri == null) return;
        try {
            Intent install = new Intent(Intent.ACTION_VIEW);
            install.setDataAndType(apkUri, "application/vnd.android.package-archive");
            install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(install);
            getSharedPreferences(PREFS, MODE_PRIVATE).edit().remove(KEY_DOWNLOAD_ID).apply();
        } catch (Exception e) {
            Toast.makeText(this, "Tidak dapat membuka pemasang Android.", Toast.LENGTH_LONG).show();
        }
    }

    @Override protected void onResume() {
        super.onResume();
        if (downloadReceiver != null) installDownloadedApk();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.add("Bagikan Samastria");
        menu.add("Versi aplikasi");
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if ("Bagikan Samastria".contentEquals(item.getTitle())) {
            Intent share = new Intent(Intent.ACTION_SEND);
            share.setType("text/plain");
            share.putExtra(Intent.EXTRA_TEXT, "Belanja di Samastria: https://samastria.my.id/");
            startActivity(Intent.createChooser(share, "Bagikan"));
            return true;
        }
        if ("Versi aplikasi".contentEquals(item.getTitle())) {
            String version = "1.0";
            try {
                PackageInfo info = getPackageManager().getPackageInfo(getPackageName(), 0);
                version = info.versionName;
            } catch (Exception ignored) {}
            Toast.makeText(this, "Samastria versi " + version, Toast.LENGTH_SHORT).show();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void handleBackAction() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else new AlertDialog.Builder(this).setTitle("Keluar dari Samastria?")
            .setMessage("Apakah Anda yakin ingin keluar dari aplikasi?")
            .setNegativeButton("Batal", (dialog, which) -> dialog.dismiss())
            .setPositiveButton("Keluar", (dialog, which) -> finish()).show();
    }

    @Override protected void onSaveInstanceState(Bundle outState) {
        if (webView != null) webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }
    @Override public void onBackPressed() { handleBackAction(); }
    @Override public boolean dispatchKeyEvent(android.view.KeyEvent event) {
        if (event.getKeyCode() == android.view.KeyEvent.KEYCODE_BACK
            && event.getAction() == android.view.KeyEvent.ACTION_UP) {
            handleBackAction(); return true;
        }
        return super.dispatchKeyEvent(event);
    }
    @Override protected void onDestroy() {
        handler.removeCallbacksAndMessages(null);
        if (downloadReceiver != null) {
            try { unregisterReceiver(downloadReceiver); } catch (Exception ignored) {}
            downloadReceiver = null;
        }
        if (webView != null) { webView.destroy(); webView = null; }
        super.onDestroy();
    }
}