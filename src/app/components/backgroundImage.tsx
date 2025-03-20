"use client";

import {useEffect} from "react";
import useTheme from "@/app/context/Theme/useTheme";

const BackgroundImage = () => {
    const {darkMode} = useTheme();
    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkMode ? "/DarkThemeBanner.png" : "/banner.png"})`;
    }, [darkMode]);
    return(
        <></>
    )
};

export default BackgroundImage;
