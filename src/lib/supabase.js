import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export async function fetchBoxscores(gameId, lastBoxScore = null) {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	const query = supabase.from('boxscores').select().eq('ext_game_id', gameId);

	const lastCreatedAt = lastBoxScore?.created_at;
	if (lastCreatedAt) {
		query.gt('created_at', lastCreatedAt);
	}

	const { data, error } = await query;
	if (error) throw error;
	return data;
}

export async function fetchGames() {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	const { data, error } = await supabase.from('games').select().order('date', { ascending: false });
	if (error) throw error;
	return data;
}
