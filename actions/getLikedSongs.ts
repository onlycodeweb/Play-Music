import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { error } from "console";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error)
  }

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs
  }))
};

export default getLikedSongs;
