import styles from './VideoApiRuc.module.scss';

export const VideoApiRuc = () => {
  return (
    <div className={styles.VideoApiRuc}>
        <video
        className={styles.VideoApiRuc__Video}
        src="/videos/description-sunat-api.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false} 
        controlsList="nodownload"
        disablePictureInPicture 
        />
    </div>
    
  );
};
