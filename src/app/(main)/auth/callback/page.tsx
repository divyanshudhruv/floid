"use client";
import { Flex, Spinner } from "@once-ui-system/core";
import { supabase } from "@/app/utils/Supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuthCallback() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { user } = session;
      const { id: uuid, user_metadata } = user;
      const newPfp = user_metadata?.avatar_url || null;
      const created_at = user.created_at;
      const email = user.email;
      const username = user_metadata?.name?.toLowerCase() || null;
      const name = user_metadata?.name || null;

      // Fetch existing profile
      const { data: existingProfile } = await supabase
        .from("users")
        .select("pfp")
        .eq("uuid", uuid)
        .single();

      let pfp = newPfp;
      if (existingProfile && existingProfile.pfp) {
        // If old pfp exists, keep it
        pfp = existingProfile.pfp;
      }

      const profile_data = {
        uuid,
        username,
        name,
        created_at,
        pfp,
        email,
      };

      await supabase.from("users").upsert([profile_data]);

      router.push(`/`);
    }

    handleAuthCallback();
  }, [router]);
  return (
    <Flex center fillWidth fillHeight style={{ minWidth: "100vw", minHeight: "100svh" }}>
      <Spinner size="xl" />
    </Flex>
  );
}
