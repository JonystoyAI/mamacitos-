
export interface LandingPageSettings {
  slug: string;
  enabled: boolean;
  theme: 'dark-luxury' | 'pink-glam' | 'cyber-lime' | 'minimal-slate';
  title: string;
  tagline: string;
  customBio: string;
  requirePassword: boolean;
  accessPassword?: string;
  blurPhotosForGuests: boolean;
  watermarkMedia: boolean;
  showDiscreetPaymentButton: boolean;
  showContentStoreLink: boolean;
  discreetUserId: string;
  contactMethods: {
    platformMessage: boolean;
    telegramUsername?: string;
    whatsappNumber?: string;
    showPhoneToPublic: boolean;
  };
  featuredServices: {
    title: string;
    price: string;
    description: string;
  }[];
}

export type Page = 
  | 'home' 
  | 'explore' 
  | 'comparte_contenido' 
  | 'premium' 
  | 'services' 
  | 'discreet_payments' 
  | 'verification' 
  | 'referrals' 
  | 'profile';

export type ProfileType = 'social' | 'sex_worker' | 'dom_sub' | 'other_services' | 'personal_contact';

export interface Profile {
  id: number;
  userIdCode: string; // E.g., MMC-9821
  name: string;
  age: number;
  location: string;
  state?: string;
  municipality?: string;
  image: string;
  uncensoredImage?: string;
  isProvider: boolean;
  bio: string;
  profileType: ProfileType;
  userType: string; 
  seeking: string; 
  template?: 'classic' | 'modern' | 'vibrant';
  isVerified?: boolean;
  verificationDoc?: 'INE' | 'Pasaporte';
  emergencyContact?: string;
  rating?: number;
  reviewsCount?: number;
  onlineStatus?: 'online' | 'offline' | 'incognito';
  topPosition?: boolean;
  landingSlug?: string;
  isPremium?: boolean;
}

export interface ContentItem {
  id: string;
  creatorId: number;
  creatorUserId: string;
  creatorName: string;
  title: string;
  description: string;
  price: number; // in MXN
  previewImage: string;
  lockedMediaUrl: string;
  unlockDurationHours: number; // 24, 168 (7 days), 0 (permanent)
  allowDownload: boolean; // false = view once / single view
  isViewOnceOnly: boolean;
  externalPlatformLink: string; // Delivered safely upon payment
  tags: string[];
  createdAt: string;
}

export interface DiscreetTransaction {
  id: string;
  buyerUserId: string;
  sellerUserId: string;
  sellerName: string;
  itemTitle: string;
  amount: number;
  commissionRate: number; // e.g. 0.12 (12%)
  commissionAmount: number;
  netPayout: number;
  status: 'COMPLETED' | 'PENDING' | 'REFUNDED';
  timestamp: string;
}

export interface UserReview {
  id: string;
  targetProfileId: number | string;
  authorUserId?: string;
  authorName: string;
  isAnonymous: boolean;
  rating: number; // 1 to 5
  punctualityScore?: number; // 1 to 5
  veracityScore?: number; // 1 to 5
  treatmentScore?: number; // 1 to 5
  comment: string;
  date: string;
  isHighRating: boolean; // true if >= 4
  isNegative: boolean; // true if <= 3
  isPubliclyVisible: boolean; // default true if rating >= 4, false if rating <= 3 unless provider enables
  providerResponse?: string;
  verifiedBooking?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface MexicoState {
  state: string;
  municipios: string[];
}

export interface ProfileView {
  id: string;
  viewerUserId: string;
  viewerName: string;
  viewerImage?: string;
  viewerIsVerified: boolean;
  viewerIsPremium: boolean;
  viewedAt: string;
  viewDuration: string;
  viewSource: 'direct_link' | 'explore_page' | 'services_page' | 'qr_code' | 'telegram_share';
  isIncognitoView: boolean;
}

export interface ProfileViewPrivacySettings {
  incognitoBrowsing: boolean; // Browse others without leaving a trace (Premium)
  hideFromVisitorsList: boolean; // Hide oneself from others' visitor logs
  notifyOnNewView: boolean; // Realtime alerts when profile is viewed
  blurVisitorAvatars: boolean; // Blur visitor profile pictures
  blockIncognitoVisitors: boolean; // Require visitors to reveal identity
}
