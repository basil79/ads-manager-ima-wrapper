var adserve;(()=>{"use strict";var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{tv:()=>n});const i=function(t,e){this._adContainer=t,this._videoElement=e,this.EVENTS={AdsManagerLoaded:"AdsManagerLoaded",AdStarted:"AdStarted",AdStopped:"AdStopped",AdSkipped:"AdSkipped",AdLoaded:"AdLoaded",AdLinearChange:"AdLinearChange",AdSizeChange:"AdSizeChange",AdExpandedChange:"AdExpandedChange",AdSkippableStateChange:"AdSkippableStateChange",AdDurationChange:"AdDurationChange",AdRemainingTimeChange:"AdRemainingTimeChange",AdVolumeChange:"AdVolumeChange",AdImpression:"AdImpression",AdClickThru:"AdClickThru",AdInteraction:"AdInteraction",AdVideoStart:"AdVideoStart",AdVideoFirstQuartile:"AdVideoFirstQuartile",AdVideoMidpoint:"AdVideoMidpoint",AdVideoThirdQuartile:"AdVideoThirdQuartile",AdVideoComplete:"AdVideoComplete",AdUserAcceptInvitation:"AdUserAcceptInvitation",AdUserMinimize:"AdUserMinimize",AdUserClose:"AdUserClose",AdPaused:"AdPaused",AdPlaying:"AdPlaying",AdError:"AdError",AdLog:"AdLog",AllAdsCompleted:"AllAdsCompleted"},this._eventCallbacks={},this.IMA_SDK_SRC="//imasdk.googleapis.com/js/sdkloader/ima3.js",window.google&&google.ima&&google.ima.AdsLoader?this.setupIMA():function(t,e=!1,i){const n=document.getElementsByTagName("head")[0]||document.documentElement,o=document.createElement("script");o.type="text/javascript",o.src=t,o.async=e,o.addEventListener("load",(function(){i&&"function"==typeof i&&i(!0,window)}),!1),o.addEventListener("error",(function(){n.removeChild(o),i&&"function"==typeof i&&i(!1)}),!1),n.insertBefore(o,n.firstChild)}(this.IMA_SDK_SRC,!0,(t=>{t&&this.setupIMA()})),this._adsLoader=null,this._adDisplayContainer=null,this._adDisplayContainerInitialized=!1,this._adsManager=null,this._currentAd=null,this._adPodInfo=null,this._attributes={volume:0},this._options={autoplay:!0,muted:!0,secure:!1,vastLoadTimeout:23e3,loadVideoTimeout:8e3}};i.prototype.setupIMA=function(){google.ima.settings.setDisableCustomPlaybackForIOS10Plus(!0),this._adDisplayContainer=new google.ima.AdDisplayContainer(this._adContainer,this._videoElement),this._adsLoader=new google.ima.AdsLoader(this._adDisplayContainer),this._adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,this.onIMAAdsManagerLoaded.bind(this),!1),this._adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,this.onIMAAdsManagerAdError.bind(this),!1)},i.prototype.doContentComplete=function(){this._adsLoader&&this._adsLoader.contentComplete()},i.prototype.maybeInitializeAdDisplayContainer=function(){this._adDisplayContainerInitialized||(this._adDisplayContainer.initialize(),this._adDisplayContainerInitialized=!0)},i.prototype.init=function(t,e,i){this.maybeInitializeAdDisplayContainer(),this._adsManager&&this._adsManager.init(t,e,i)},i.prototype.start=function(){this._adsManager&&this._adsManager.start()},i.prototype.getDuration=function(){return this._currentAd?this._currentAd.getDuration():-2},i.prototype.getRemainingTime=function(){return this._adsManager?this._adsManager.getRemainingTime():-2},i.prototype.resume=function(){this._adsManager&&this._adsManager.resume()},i.prototype.pause=function(){this._adsManager&&this._adsManager.pause()},i.prototype.stop=function(){this._adsManager&&this._adsManager.stop()},i.prototype.skip=function(){this._adsManager&&this._adsManager.skip()},i.prototype.resize=function(t,e,i){this._adsManager&&(this._adsManager.resize(t,e,i),this.onAdSizeChange())},i.prototype.getVolume=function(){return this._adsManager&&this._adsManager.getVolume()},i.prototype.setAdVolume=function(t){this._adsManager&&this._adsManager.setVolume(t)},i.prototype.collapse=function(){this._adsManager&&this._adsManager.collapse()},i.prototype.expand=function(){this._adsManager&&this._adsManager.expand()},i.prototype.requestAds=function(t,e){Object.assign(this._options,e);const i=new google.ima.AdsRequest;let n=!1;try{new URL(t),n=!0}catch(t){}n?i.adTagUrl=t:i.adsResponse=t,this._options.pageUrl&&(i.pageUrl=this._options.pageUrl),i.vastLoadTimeout=this._options.vastLoadTimeout,i.linearAdSlotWidth=this._videoElement.width,i.linearAdSlotHeight=this._videoElement.height,i.nonLinearAdSlotWidth=this._videoElement.width,i.nonLinearAdSlotHeight=150,i.setAdWillAutoPlay(this._options.autoplay),this._options.muted&&i.setAdWillPlayMuted(this._options.muted),this._adsLoader.getSettings().setVpaidMode(this._options.secure?google.ima.ImaSdkSettings.VpaidMode.ENABLED:google.ima.ImaSdkSettings.VpaidMode.INSECURE),this._adsLoader.requestAds(i)},i.prototype.abort=function(){this._adsManager&&(this._adsManager.destroy(),this._adsManager=null),this.doContentComplete()},i.prototype.onIMAAdsManagerLoaded=function(t){const e=new google.ima.AdsRenderingSettings;e.restoreCustomPlaybackStateOnAdBreakComplete=!0,e.loadVideoTimeout=this._options.loadVideoTimeout,this._adsManager=t.getAdsManager(this._videoElement,e),this._adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,this.onIMAAdError.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY,(function(){})),this._adsManager.addEventListener(google.ima.AdEvent.Type.AD_METADATA,(function(){})),this._adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,this.onAllAdsCompleted.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.CLICK,this.onIMAAdClickThru.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE,this.onIMAAdVideoComplete.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,this.onAdStarted.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,this.onAdStopped.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.DURATION_CHANGE,this.onAdDurationChange.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE,this.onAdVideoFirstQuartile.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION,this.onAdImpression.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.INTERACTION,this.onAdInteraction.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.LINEAR_CHANGED,this.onAdLinearChange.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.LOADED,this.onIMAAdLoaded.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.LOG,this.onIMAAdLog.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT,this.onAdVideoMidpoint.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED,this.onAdPaused.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED,this.onAdPlaying.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED,this.onAdSkippableStateChange.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED,this.onIMAAdSkipped.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.STARTED,this.onAdVideoStart.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE,this.onAdVideoThirdQuartile.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE,this.onAdUserClose.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED,this.onAdVolumeChange.bind(this)),this._adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_MUTED,this.onAdVolumeChange.bind(this)),this.onAdsManagerLoaded()},i.prototype.onIMAAdsManagerAdError=function(t){this.abort(),this.onAdError(t.getError())},i.prototype.onIMAAdClickThru=function(t){this.onAdClickThru("",t.getAd().getAdId(),!1)},i.prototype.onIMAAdVideoComplete=function(){this.onAdVideoComplete()},i.prototype.onIMAAdLoaded=function(t){this._currentAd=t.getAd(),this.onAdLoaded()},i.prototype.onIMAAdSkipped=function(){this.abort(),this.onAdSkipped(),this.onAdStopped()},i.prototype.onIMAAdError=function(t){this.abort(),this.onAdError(t.getError())},i.prototype.onIMAAdLog=function(t){(t=t.getAdData()).hasOwnProperty("adError")?this.onAdLog(t.adError.getMessage()):this.onAdLog("IMA Ad Log")},i.prototype.onAdsManagerLoaded=function(){this._callEvent(this.EVENTS.AdsManagerLoaded)},i.prototype.onAdLoaded=function(){this.EVENTS.AdLoaded in this._eventCallbacks&&this._eventCallbacks[this.EVENTS.AdLoaded](this._currentAd)},i.prototype.onAdStarted=function(){this._callEvent(this.EVENTS.AdStarted)},i.prototype.onAdDurationChange=function(){this._callEvent(this.EVENTS.AdDurationChange)},i.prototype.onAdLinearChange=function(){this._callEvent(this.EVENTS.AdLinearChange)},i.prototype.onAdSkippableStateChange=function(){this._callEvent(this.EVENTS.AdSkippableStateChange)},i.prototype.onAdSizeChange=function(){this._callEvent(this.EVENTS.AdSizeChange)},i.prototype.onAdVolumeChange=function(){this._callEvent(this.EVENTS.AdVolumeChange)},i.prototype.onAdVideoStart=function(){this._callEvent(this.EVENTS.AdVideoStart)},i.prototype.onAdImpression=function(){this._callEvent(this.EVENTS.AdImpression)},i.prototype.onAdVideoFirstQuartile=function(){this._callEvent(this.EVENTS.AdVideoFirstQuartile)},i.prototype.onAdVideoMidpoint=function(){this._callEvent(this.EVENTS.AdVideoMidpoint)},i.prototype.onAdVideoThirdQuartile=function(){this._callEvent(this.EVENTS.AdVideoThirdQuartile)},i.prototype.onAdVideoComplete=function(){this._callEvent(this.EVENTS.AdVideoComplete)},i.prototype.onAdPaused=function(){this._callEvent(this.EVENTS.AdPaused)},i.prototype.onAdPlaying=function(){this._callEvent(this.EVENTS.AdPlaying)},i.prototype.onAdSkipped=function(){this._callEvent(this.EVENTS.AdSkipped)},i.prototype.onAdStopped=function(){this._callEvent(this.EVENTS.AdStopped)},i.prototype.onAdClickThru=function(t,e,i){this.EVENTS.AdClickThru in this._eventCallbacks&&this._eventCallbacks[this.EVENTS.AdClickThru](t,e,i)},i.prototype.onAdInteraction=function(){this._callEvent(this.EVENTS.AdInteraction)},i.prototype.onAdUserClose=function(){this._callEvent(this.EVENTS.AdUserClose)},i.prototype.onAllAdsCompleted=function(){this.abort(),this._callEvent(this.EVENTS.AllAdsCompleted)},i.prototype.onAdError=function(t){this.EVENTS.AdError in this._eventCallbacks&&this._eventCallbacks[this.EVENTS.AdError](t)},i.prototype.onAdLog=function(t){this.EVENTS.AdLog in this._eventCallbacks&&this._eventCallbacks[this.EVENTS.AdLog](t)},i.prototype._callEvent=function(t){t in this._eventCallbacks&&this._eventCallbacks[t]()},i.prototype.addEventListener=function(t,e,i){const n=e.bind(i);this._eventCallbacks[t]=n},i.prototype.removeEventListener=function(t){this._eventCallbacks[t]=null};const n={IMAWrapper:i};adserve=e})();