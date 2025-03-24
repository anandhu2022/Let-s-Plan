import React from 'react';
import Container from "@/app/components/Container";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import useTheme from "@/app/context/Theme/useTheme";

const WelcomeBannerCards = () => {
    const {darkMode} = useTheme();
    return (
        <div className={`absolute bottom-0 flex flex-row w-full justify-evenly gap-5 px-5 transform translate-y-1/2`}>
            <Container classNames={`rounded-md flex flex-1 justify-between flex-col gap-3 transform duration-500 
            hover:-translate-y-2`}>
                <div className={`flex flex-row justify-between w-full items-center`}>
                    <div>
                        Projects
                    </div>
                    <div className={`p-1.5 bg-blue-700/20 text-blue-700 rounded-md flex cursor-pointer`}>
                        <WorkOutlineIcon/>
                    </div>
                </div>
                <div className={`text-4xl font-bold`}>
                    132
                </div>
                <div>
                    <span className={`${darkMode ? "text-white" : "text-black"} transition duration-300 ease-out`}>
                        2
                    </span>&nbsp;Completed
                </div>
            </Container>
            <Container classNames={`rounded-md flex flex-1 justify-between flex-col gap-3 transform duration-500 
            hover:-translate-y-2`}>
                <div className={`flex flex-row justify-between w-full items-center`}>
                    <div>
                        Active Tasks
                    </div>
                    <div className={`p-1.5 bg-blue-700/20 text-blue-700 rounded-md flex cursor-pointer`}>
                        <CachedOutlinedIcon/>
                    </div>
                </div>
                <div className={`text-4xl font-bold`}>
                    132
                </div>
                <div>
                    <span className={`${darkMode ? "text-white" : "text-black"} transition duration-300 ease-out`}>
                        2
                    </span>&nbsp;Completed
                </div>
            </Container>
            <Container classNames={`rounded-md flex flex-1 justify-between flex-col gap-3 transform duration-500 
            hover:-translate-y-2`}>
                <div className={`flex flex-row justify-between w-full items-center`}>
                    <div>
                        Teams
                    </div>
                    <div className={`p-1.5 bg-blue-700/20 text-blue-700 rounded-md flex cursor-pointer`}>
                        <GroupsOutlinedIcon/>
                    </div>
                </div>
                <div className={`text-4xl font-bold`}>
                    132
                </div>
                <div>
                    <span className={`${darkMode ? "text-white" : "text-black"} transition duration-300 ease-out`}>
                        2
                    </span>&nbsp;Completed
                </div>
            </Container>
            <Container classNames={`rounded-md flex flex-1 justify-between flex-col gap-3 transform duration-500 
            hover:-translate-y-2`}>
                <div className={`flex flex-row justify-between w-full items-center`}>
                    <div>
                        Productivity
                    </div>
                    <div className={`p-1.5 bg-blue-700/20 text-blue-700 rounded-md flex cursor-pointer`}>
                        <StackedLineChartOutlinedIcon/>
                    </div>
                </div>
                <div className={`text-4xl font-bold`}>
                    132
                </div>
                <div>
                    <span className={`${darkMode ? "text-white" : "text-black"} transition duration-300 ease-out`}>
                        2%
                    </span>&nbsp;Completed
                </div>
            </Container>
        </div>
    );
};

export default WelcomeBannerCards;