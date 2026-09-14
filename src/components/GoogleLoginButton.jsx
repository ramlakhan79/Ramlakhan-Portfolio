import { useEffect, useRef, useState } from "react";
import { googleLogin } from "../utils/admin";

const GoogleLoginButton = ({ onSuccess }) => {
  const buttonRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const renderGoogleButton = () => {
      if (
        !window.google ||
        !buttonRef.current
      ) {
        return;
      }

      buttonRef.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id:
          import.meta.env
            .VITE_GOOGLE_CLIENT_ID,

        callback: async (response) => {
          try {
            setError("");

            const data =
              await googleLogin(
                response.credential
              );

            localStorage.setItem(
              "token",
              data.token
            );

            localStorage.setItem(
              "user",
              JSON.stringify(data.user)
            );

            onSuccess(data.user);
          } catch (error) {
            setError(
              error.message ||
                "Google login failed"
            );
          }
        },
      });

      window.google.accounts.id.renderButton(
        buttonRef.current,
        {
          theme: "outline",
          size: "large",
          width: 360,
          text: "signin_with",
        }
      );
    };

    if (window.google) {
      renderGoogleButton();
      return;
    }

    const script =
      document.createElement("script");

    script.src =
      "https://accounts.google.com/gsi/client";

    script.async = true;
    script.defer = true;

    script.onload =
      renderGoogleButton;

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [onSuccess]);

  return (
    <div className="w-full">

      <div
        ref={buttonRef}
        className="flex justify-center w-full"
      />

      {error && (
        <p className="text-red-400 text-sm text-center mt-3">
          {error}
        </p>
      )}

    </div>
  );
};

export default GoogleLoginButton;

