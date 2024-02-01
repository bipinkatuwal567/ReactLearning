import { useEffect } from "react";

export function useKey(key, action){
    useEffect(() => {
        function callback(e) {
          if (e.code === key) {
            action();
            console.log("back");
          }
        }
        document.addEventListener("keydown", callback);
        return function () {
          document.removeEventListener("keydown", callback);
        };
      }, [action, key]);
}