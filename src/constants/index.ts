import { GoHome, GoHomeFill } from "react-icons/go";
import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from "react-icons/hi";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";

export const links = [
    { name: 'Discover', to: '/', icon: HiOutlineHome},
    { name: 'Around you', to: '/around-you', icon: HiOutlinePhotograph},
    { name: 'Discover', to: '/top-artists', icon: HiOutlineUserGroup},
    { name: 'Discover', to: '/top-charts', icon: HiOutlineHashtag},
]

export const NavList = [
    { name: 'Home', to: '/', inactiveIcon: GoHome, activeIcon: GoHomeFill},
    { name: 'Search', to: '/search', inactiveIcon: RiSearch2Line, activeIcon: RiSearch2Fill },
]

export const chooseTypes = [
    { name: "album", id: "album" },
    { name: "track", id: "track" },
    { name: "artist", id: "artist" },
    { name: "playlist", id: "playlist" },
]