import { auth } from "@/auth";
import { NavbarClient } from "@/components/layout/navbar-client";

export const Navbar = async () => {
  const session = await auth();

  return <NavbarClient isAuthenticated={!!session?.user} />;
};
