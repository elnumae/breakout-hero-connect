import { useEffect } from "react";

const VideoRedirect = () => {
  useEffect(() => {
    // Replace this URL with your actual video link
    const videoUrl = "https://youtu.be/diyltDnus4c";

    // Perform the redirect
    window.location.href = videoUrl;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting to video...</h2>
        <p className="text-gray-600">You will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default VideoRedirect;
