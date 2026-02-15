import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth-slice";
import { clearUser } from "@/redux/features/auth-slice";

/* export const apiFetch = async (url: string, options: RequestInit = {}, retryCount = 0) => {
  const accessToken = Cookies.get("access_token");

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      // فقط أضف Content-Type لو مش FormData
      ...(!isFormData && { "Content-Type": "application/json" }),
    },
    credentials: "include",
  });

  if ((res.status === 401 || res.status === 403) && retryCount < 1) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch(url, options, retryCount + 1);
    }
  }

  return res;
}; */
export const apiFetch = async (url: string, options: RequestInit = {}, retryCount = 0) => {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(!isFormData && { "Content-Type": "application/json" }),
    },
    credentials: "include", // يرسل الكوكي تلقائيًا
  });

  if ((res.status === 401 || res.status === 403) && retryCount < 1) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch(url, options, retryCount + 1);
    }
  }

  return res;
};

export const refreshAccessToken = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return false;

    const result = await res.json();
    return result; // رجّع بيانات الـ user
  } catch (err) {
    console.error("فشل تحديث التوكن:", err);
    return false;
  }
};
export const useRefreshUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const refreshUser = async () => {
    const result: any = await refreshAccessToken();
if (result) {
  const userData = result.user ?? result;
  dispatch(setUser(userData));
}
  };

  return refreshUser;
};


export const Logout = async (dispatch: AppDispatch, router: any) => {
  try {
    // 1. استدعاء الـ backend لمسح jwt (HttpOnly cookie)
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    // 2. مسح أي كوكيز غير HttpOnly
    Cookies.remove("access_token");

    // 3. نظّف الـ Redux state
    dispatch(clearUser());


    // . إعادة التوجيه بعد ثانية ونصف
    setTimeout(() => {
      router.push("/"); // ✅ بدل window.location.href
    }, 1500);
  } catch (err) {
    toast.error("Error during logout ❌");
  }
};
