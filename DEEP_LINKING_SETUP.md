# Deep Linking Setup

This project includes deep linking configuration for iOS Universal Links and Android App Links.

## iOS Universal Links

### File Location
- `public/.well-known/apple-app-site-association`

### Configuration
- **Bundle ID**: `com.samjoosten.tripo`
- **Paths**: `/join/*`

### Setup Steps
1. Replace `TEAM_ID` in the AASA file with your Apple Developer Team ID
2. Ensure your domain has HTTPS enabled
3. The file will be served at: `https://yourdomain.com/.well-known/apple-app-site-association`
4. In your iOS app (Xcode), add the Associated Domains capability:
   - Format: `applinks:yourdomain.com`
5. Verify the AASA file using Apple's validator:
   - https://search.developer.apple.com/appsearch-validation-tool/

### Testing
```bash
# Test that the file is accessible
curl https://yourdomain.com/.well-known/apple-app-site-association
```

## Android App Links

### File Location
- `public/.well-known/assetlinks.json`

### Configuration
- **Package Name**: `com.samjoosten.tripo`
- **Paths**: `/join/*`

### Setup Steps
1. Get your app's SHA256 fingerprint:
   ```bash
   # For debug keystore
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # For release keystore
   keytool -list -v -keystore /path/to/your/keystore -alias your-alias
   ```

2. Replace `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` in the assetlinks.json with your actual SHA256 fingerprint (remove colons)

3. The file will be served at: `https://yourdomain.com/.well-known/assetlinks.json`

4. In your Android app's `AndroidManifest.xml`, add an intent filter to your main activity:
   ```xml
   <intent-filter android:autoVerify="true">
       <action android:name="android.intent.action.VIEW" />
       <category android:name="android.intent.category.DEFAULT" />
       <category android:name="android.intent.category.BROWSABLE" />
       <data
           android:scheme="https"
           android:host="yourdomain.com"
           android:pathPrefix="/join" />
   </intent-filter>
   ```

5. Verify the assetlinks.json file using Google's validator:
   - https://developers.google.com/digital-asset-links/tools/generator

### Testing
```bash
# Test that the file is accessible
curl https://yourdomain.com/.well-known/assetlinks.json

# Test deep link
adb shell am start -W -a android.intent.action.VIEW -d "https://yourdomain.com/join/test123" com.samjoosten.tripo
```

## Important Notes

1. **HTTPS Required**: Both iOS and Android require your domain to serve these files over HTTPS
2. **No Redirects**: The files must be served directly without redirects
3. **Content-Type**: 
   - AASA: `application/json` or `application/pkcs7-mime`
   - assetlinks.json: `application/json`
4. **Caching**: Consider caching headers to avoid frequent re-validation
5. **Multiple Environments**: You may need separate configurations for development, staging, and production

## Deployment

When deploying to production:
1. Ensure the `.well-known` folder is included in your build
2. Configure your web server to serve these files with the correct content-type
3. Test the links immediately after deployment
4. Monitor server logs to ensure the files are being accessed by Apple/Google validators

## Troubleshooting

### iOS
- Check the AASA file format is valid JSON
- Verify the Team ID is correct (found in Apple Developer account)
- Ensure the app's Associated Domains capability matches the domain
- Check device logs: Settings → Privacy → Diagnostics & Usage → Diagnostic & Usage Data → swcd*

### Android
- Verify SHA256 fingerprint is correct (no colons, uppercase)
- Check the package name matches exactly
- Use `adb logcat` to see App Links verification status
- Test on Android 6.0+ (App Links require API 23+)
