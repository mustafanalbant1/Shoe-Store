import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { login, register, clearError } from "../redux/slices/authSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Form değişikliklerini takip et
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form gönderimini işle
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hata mesajını temizle
    dispatch(clearError());

    try {
      if (isLogin) {
        // Giriş işlemi
        await dispatch(
          login({
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();
      } else {
        // Kayıt işlemi
        await dispatch(register(formData)).unwrap();
      }
      // Başarılı işlem sonrası ana sayfaya yönlendir
      navigate("/");
    } catch (err) {
      // Hata işleme redux slice'da yapılıyor
      console.error("İşlem başarısız:", err);
    }
  };

  // JSX kısmı aynı kalacak, sadece loading ve error state'lerini ekleyelim
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Logo veya İkon */}
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
            <FaRegUser size={30} className="text-orange-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isLogin ? "Hoş Geldiniz" : "Hesap Oluşturun"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Hesabınıza giriş yapın" : "Hemen üye olun"}
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Adınız ve Soyadınız"
                required={!isLogin}
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="ornek@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Şifre Tekrar
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="••••••••"
                required={!isLogin}
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 disabled:bg-orange-300"
          >
            {loading
              ? isLogin
                ? "Giriş yapılıyor..."
                : "Kayıt yapılıyor..."
              : isLogin
              ? "Giriş Yap"
              : "Kayıt Ol"}
          </button>
        </form>

        {/* Alt Bölüm */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-orange-600 hover:text-orange-500"
            >
              {isLogin ? "Yeni Hesap Oluştur" : "Giriş Yap"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <a
                href="#"
                className="text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                Şifrenizi mi unuttunuz?
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
