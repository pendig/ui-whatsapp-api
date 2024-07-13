import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

interface NoCacheImageProps {
  src: string;
  alt: string;
}

const NoCacheImage: React.FC<NoCacheImageProps> = ({ src, alt }) => {
  const [uniqueSrc, setUniqueSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const updateImageSrc = () => {
      const imageUrl = new URL(src, window.location.origin); // Membuat URL baru dari src
      imageUrl.searchParams.set('time', new Date().getTime().toString()); // Set atau update parameter 'time'
      setUniqueSrc(imageUrl.href); // Gunakan href untuk mendapatkan URL lengkap
      setHasError(false);
    };

    let intervalId: any = null;
    if (!imageLoaded) {
      // Jika gambar belum ter-muat, jalankan interval
      intervalId = setInterval(updateImageSrc, 2000);
    }
    updateImageSrc(); // Panggil sekali di awal juga

    return () => {
      if (intervalId) clearInterval(intervalId); // Bersihkan interval jika ada
    };
  }, [src, imageLoaded]);

  const handleError = () => {
    setHasError(true);
    setImageLoaded(false); // Reset loading status jika terjadi error
  };

  const handleLoad = () => {
    setImageLoaded(true); // Set image telah dimuat
  };

  return (
    <div>
      {!hasError ? (
        <img src={uniqueSrc} alt={alt} onError={handleError} onLoad={handleLoad} className="max-w-full" />
      ) : (
        <FadeLoader color="#36d7b7" loading={true} aria-label="Loading Spinner" data-testid="loader" />
      )}
    </div>
  );
};

export default NoCacheImage;
