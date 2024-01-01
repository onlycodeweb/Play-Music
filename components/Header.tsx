"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";

import { useUser } from "@/hooks/useUser";
// import usePlayer from "@/hooks/usePlayer";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlinePlus } from "react-icons/ai";
import useUploadModal from "@/hooks/useUploadModal";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className,
}) => {
    //   const player = usePlayer();
    const router = useRouter();
    const uploadModal = useUploadModal();
    const authModal = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        // player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Logged out!')
        }
    }

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }
        return uploadModal.onOpen();
    }

    return (
        <div
            className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-rose-900
        p-6
        `,
                className
            )}
        >
            <div
                className="
            w-full
            md-4
            flex
            items-center
            justify-between
            "
            >
                <div
                    className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                    "
                >

                    <button
                        onClick={() => router.back()}
                        className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    "
                    >
                        <RxCaretLeft size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    "
                    >
                        <RxCaretRight size={35} />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <div>
                        <button
                            onClick={() => router.push('/')}
                            className="
                                rounded-full 
                                p-2 
                                bg-white 
                                flex 
                                items-center 
                                justify-center 
                                cursor-pointer 
                                hover:opacity-75 
                                transition
                                "
                        >
                            <HiHome className="text-black" size={20} />
                        </button>
                    </div>

                    <button
                        onClick={() => router.push('/search')}
                        className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <BiSearch className="text-black" size={20} />
                    </button>
                    <button
                        onClick={onClick}
                        className="
                            rounded-full 
                            p-2 
                            bg-white 
                            flex 
                            items-center 
                            justify-center 
                            cursor-pointer 
                            hover:opacity-75 
                            transition
                        "
                    >
                        <AiOutlinePlus className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <div
                                className="
                            hidden
                            md:flex
                            gap-x-2
                            items-center
                            "
                            >
                                <Button
                                    onClick={handleLogout}
                                    className="bg-white px-6 py-2"
                                >
                                    Logout
                                </Button>
                                <Button
                                    onClick={() => { }}
                                    className="bg-white"
                                >
                                    <FaUserAlt />
                                </Button>
                            </div>


                            <div className="flex md:hidden gap-x-2 items-center">
                                <Button
                                    onClick={handleLogout}
                                    className="
                            rounded-full 
                            p-2 
                            bg-white 
                            flex 
                            items-center 
                            justify-center 
                            cursor-pointer 
                            hover:opacity-75 
                            transition
                        "
                                >
                                    <IoExitOutline size={25} />
                                </Button>
                                <Button
                                    onClick={() => { }}
                                    className="bg-white"
                                >
                                    <FaUserAlt />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="
                                bg-transparent 
                                text-neutral-300 
                                font-medium
                            "
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="bg-white px-6 py-2"
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;
