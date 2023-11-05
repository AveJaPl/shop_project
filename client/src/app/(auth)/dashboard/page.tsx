"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardComponent from "./dashboard";

interface User {
  email: string;
  id: number;
  name: string;
  isAdmin: boolean;
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.post(
          "http://localhost:4000/user/data",
          {},
          { withCredentials: true }
        );
        setUser({ ...user.data });
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    user ? <DashboardComponent user={user}/> : <div className="flex h-full w-full items-center justify-center">Loading...</div>

  );
}

export default Dashboard;
