import { VN } from './vn';

const EN: typeof VN = {
  bottomTab: {
    home: 'Home',
    cart: 'Cart',
    profile: 'Profile',
  },
  login: {
    title: 'Login',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    loginButton: 'Login',
    infoText: 'This is a login screen.',
    dontHaveAccount: "Don't have an account?",
    registerHere: 'Register here.',
    validation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email format',
      passwordRequired: 'Password is required',
      passwordMin: 'Password must be at least 6 characters',
    },
  },
  register: {
    title: 'Register',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    confirmPasswordPlaceholder: 'Confirm Password',
    registerButton: 'Register',
    infoText: 'This is a registration screen.',
    agreeTo: 'I agree to the',
    terms: 'Terms',
    and: '&',
    policy: 'Privacy Policy',
    alreadyHaveAccount: 'Already have an account?',
    loginNow: 'Login now',
    validation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email format',
      passwordRequired: 'Password is required',
      passwordConfirmRequired: 'Confirm Password is required',
      passwordMismatch: 'Passwords do not match',
      passwordMin: 'Password must be at least 6 characters',
    },
  },
  home: {
    bannerTitle: 'Step into Style:\nYour Fashion Destination',
    bannerButton: 'Explore Now',
    footer: {
      shipping: {
        title: 'Giao hàng toàn quốc',
        desc: 'Vận chuyển nhanh chóng và an toàn đến tận tay bạn trong vòng 2-5 ngày làm việc.',
      },
      secure: {
        title: 'Bảo mật thanh toán',
        desc: 'Chúng tôi cam kết bảo mật thông tin thanh toán của khách hàng một cách tuyệt đối.',
      },
      support: {
        title: 'Hỗ trợ 24/7',
        desc: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc của bạn.',
      },
    },
  },
};

export { EN };
