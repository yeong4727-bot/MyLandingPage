export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  avatar_url: string | null;
  created_at: string;
};

export type NewGuestbookEntry = {
  name: string;
  message: string;
  avatar_url?: string | null;
};
