function replaceManifestUrl(url) {
    console.log('REPLACE MANIFEST URL');
    return url;
}

export default function ModuleFederationReplaceManifestUrlPlugin() {
    return {
        name: 'plugin-replace-manifest-url',
        fetch(manifestUrl, requestInt) {
            return fetch(replaceManifestUrl(manifestUrl), requestInt);
        },
    };
}
