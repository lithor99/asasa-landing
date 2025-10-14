import FingerprintJS from "@/assets/fingerprint/fp";

export const useStartNativeApplicationByURL = (url: string) => {
    try {
        const wd: any = window;
        if (wd?.plat == "ycgdroid") {
            wd?.YCGO?.startAppplicationByUrl(url); // request get lat lng to android native (INS object in window is register by native)
            
        } else if (wd?.plat == "ycgios") {
            wd.location = `startappbyurl://?${btoa(url)}`; // request get lat lng to ios native (getlatlng:// is register by native)
            
        } else {
            window.open(url, "_blank");
        }
    } catch (error) {
        window.open(url, "_blank");
    }
}

export const useMakePhoneCall = (phoneNumber: string) => {
    try {
        const wd: any = window;
        if (wd?.plat == "ycgdroid") {
            wd?.YCGO?.makePhoneCall(phoneNumber); // request phone call to android native (INS object in window is register by native)
            
        } else if (wd?.plat == "ycgios") {
            wd.location = `makephonecall://?${btoa(phoneNumber)}`; // request phone call to ios native (getlatlng:// is register by native)
        } else {
            window.open("tel:" +phoneNumber, "_blank");
        }
    } catch (error) {
        window.open("tel:" + phoneNumber, "_blank");
    }
}

export const useShareToSocial = (link: string) => {
    try {
        const wd: any = window;
        if (wd?.plat == "ycgdroid") {
            wd?.YCGO?.shareLink(link); // request phone call to android native (INS object in window is register by native)
            
        } else if (wd?.plat == "ycgios") {
            wd.location = `sharelink://?${btoa(link)}`; // request phone call to ios native (getlatlng:// is register by native)
        } else if (navigator.share) {
            navigator.share({
                title: 'YCGO',
                text: 'YCGO link',
                url: link,
            })
        }
    } catch (error) {
    }
}

export const useStartNativeAppplicationOrPlaystore = (packageId: string) => {
    try {
        const wd: any = window;
        if (wd?.plat == "ycgdroid") {
            wd?.YCGO?.startAppplicationOrPlaystore(packageId); // request get lat lng to android native (INS object in window is register by native)
            
        } else if (wd?.plat == "ycgios") {
            wd.location = `startapporstore://?${btoa(packageId)}`; // request get lat lng to ios native (getlatlng:// is register by native)
            
        }
    } catch (error) {}
}

export const useGetDeviceId = async () => {
    let deviceId = ''
    try {
        const wd: any = window;
        if (wd?.plat == "ycgdroid") {
            deviceId = (await wd?.YCGO?.getCurrentDeviceId()) || wd?.dvice; // request get lat lng to android native (INS object in window is register by native)
            
        } else if (wd?.plat == "ycgios") {
            wd.location = `dosetios://`; // request get lat lng to ios native (getlatlng:// is register by native)
            deviceId = wd?.dvice
        } else {
            throw 'fingerprint'
        }
    } catch (error) {
        const fingerprintPromise = FingerprintJS.load();
        const fingerprint = await fingerprintPromise.then((fp: any) =>
            fp.get(),
        );
        deviceId = fingerprint.visitorId
    }
    return deviceId;
}

export const useGetFingerprint = async () => {
    let deviceId = ''
    const fingerprintPromise = FingerprintJS.load();
    const fingerprint = await fingerprintPromise.then((fp: any) =>
        fp.get(),
    );
    deviceId = fingerprint.visitorId
    return deviceId;
}