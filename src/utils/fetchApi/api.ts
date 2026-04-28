export const API = {
  //Login & Register
  Login: 'api/v1/user/login',
  Register: 'api/v1/user/signup',

  // Products
  Products: 'api/v1/product',
  Hot: 'api/v1/product/hot',
  ProductDetail: (id: number) => `api/v1/product/${id}`,
  Search: 'api/v1/product/filter',
  Related: (productId: number, userId?: number) =>
    `/api/v1/product/related?product_id=${productId}${
      userId ? `&user_id=${userId}` : ''
    }`,
  Recommend: (productId: number) => `/api/v1/product/recommend/${productId}`,
  Detail: (productId: number) => `/api/v1/product/${productId}`,
  Reviews: (productId: number) => `/api/v1/product/review/${productId}`,
  UserReview: (productId: number, userId: number) =>
    `/api/v1/product/review/${productId}/user/${userId}`,
  CreateReview: () => `/api/v1/product/review/new`,
  Item: (cartId: number) => `/api/v1/product/item/${cartId}`,
  Image: (imageName: string) => `/api/v1/product/image/${imageName}`,

  //Account
  Account: (id: number) => `api/v1/user/${id}`,
  FullInfo: (userId: number) => `/api/v1/user/${userId}/full`,
  UpdateAccount: (id: number) => `api/v1/user/update/${id}`,
  UpdateAddress: (id: number) => `api/v1/user/address/update/${id}`,
  ChangePassword: (id: number) => `api/v1/user/${id}/change-password`,
  AccountImage: (image: string) => `api/v1/user/image/${image}`,

  //Cart
  Cart: (userId: number) => `api/v1/order/user/${userId}`,
  CreateCart: () => `/api/v1/order/new`,
  CancelCart: (orderId: number) => `/api/v1/order/cancel/${orderId}`,
  CheckBuyCart: (userId: number, productId: number) =>
    `/api/v1/order/user/${userId}/check-buy/${productId}`,
};

export const KEY_API = {
  Login: 'login',
  Register: 'register',
  Products: 'products',
  Hot: 'hot-products',
  search: 'search',
  Detail: 'product-detail',
};
