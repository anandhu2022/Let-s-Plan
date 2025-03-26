import {Autocomplete, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Container from "@/app/components/Container";
import React, {useState} from "react";
import useTheme from "@/app/context/Theme/useTheme";
import Input from "@/app/components/form/Input";
import Button from "@/app/components/form/Button";

const Members = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState<"select" | "create">("select");
    const [selectedTeamMembers, setSelectedTeamMembers] = useState<{ name: string }[]>([]);
    const {darkMode} = useTheme();
    const [loading, setLoading] = useState<boolean>(false)
    const handleOpen = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const top100Films = [
        {name: 'Anandhu'},
        {name: 'Arjun'},
        {name: 'Rohit'},
        {name: 'Kamal'},
        {name: 'Nishanth'},
    ];
    return (
        <Container className={`rounded-md w-full h-fit flex flex-col gap-3`}>
            <span>Team&nbsp;Members</span>
            <hr/>
            <RadioGroup row value={action} onChange={(e) =>
                setAction(e.target.value as "select" | "create")}>
                <FormControlLabel value="select" control={<Radio/>} label="Select Team"/>
                <FormControlLabel value="create" control={<Radio/>} label="Create Team"/>
            </RadioGroup>
            <div className={`flex flex-col gap-1.5`}>
                <div className={`${action === 'select' ? "max-h-fit opacity-100" : "max-h-0 opacity-0 hidden"}`}>
                    <span>Select Team</span>
                    <select
                        className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none focus:ring-4 w-full
            transition duration-300 ease-out
            ${darkMode ? "placeholder:text-[#64747a] bg-[#0f172a] focus:ring-indigo-900" :
                            "placeholder:text-[#4e5c59] bg-white border-1 border-gray-300 focus:ring-violet-200"}`}>
                        <option value="">Select team</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                    </select>
                </div>
                <div className={`${action === 'create' ? "max-h-fit opacity-100" : "max-h-0 opacity-0 hidden"} 
                flex flex-col gap-3`}>
                    <div className={`flex flex-col gap-1.5`}>
                        <span>Team Name</span>
                        <Input id={"team-name"} type={"text"} placeholder={"Team title"} />
                    </div>
                    <div className={`flex flex-col gap-1.5`}>
                        <span>Select Members</span>
                        <Autocomplete
                            multiple
                            limitTags={2}
                            id="multiple-limit-tags"
                            open={open}
                            onOpen={handleOpen}
                            onClose={handleClose}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            options={top100Films}
                            loading={loading}
                            onChange={(_, newValue) => setSelectedTeamMembers(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select the team members"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            padding: "6px",
                                            borderRadius: "6px",
                                            fontSize: "0.875rem",
                                            outline: "none",
                                            transition: "all 0.3s ease-out",
                                            border: darkMode ? "1px solid #0f172a" : "1px solid #d1d5db",
                                            backgroundColor: darkMode ? "#0f172a" : "#ffffff",
                                            "&.Mui-focused": {
                                                borderColor: darkMode ? "#624bff" : "#9333ea",
                                                boxShadow: darkMode ? "0 0 8px #624bff" : "0 0 8px #9333ea",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: darkMode ? "#ffffff" : "#4e5c59",
                                            fontSize: "0.875rem",
                                        },
                                        "& .MuiChip-root": {
                                            backgroundColor: "#624bff",
                                            color: "#fff",
                                            fontSize: "0.75rem",
                                        },
                                        "& .MuiChip-deleteIcon": {
                                            color: "#ffffff !important" ,
                                        },
                                        "& .MuiInputBase-input::placeholder": {
                                            color: darkMode ? "#64747a" : "#4e5c59",
                                            opacity: 1,
                                        },
                                        "& .MuiAutocomplete-clearIndicator": {
                                            color: darkMode ? "#ffffff" : "#4e5c59",
                                        },
                                        "& .MuiAutocomplete-popupIndicator": {
                                            color: darkMode ? "#ffffff" : "#4e5c59",
                                        },
                                    }}
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {loading ? <CircularProgress color="primary" size={20}/> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        },
                                    }}
                                />
                            )}
                            sx={{
                                width: "100%",
                            }}
                        />
                    </div>
                    {selectedTeamMembers.length > 0 && (
                        <div className={`flex flex-col gap-1.5`}>
                            <span>Select Team lead</span>
                            <select
                                className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none focus:ring-4 w-full
            transition duration-300 ease-out
            ${darkMode ? "placeholder:text-[#64747a] bg-[#0f172a] focus:ring-indigo-900" :
                                    "placeholder:text-[#4e5c59] bg-white border-1 border-gray-300 focus:ring-violet-200"}`}>
                                <option value="">Select team lead</option>
                                {selectedTeamMembers.map((member, index) => (
                                    <option key={index} value={member.name}>{member.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className={`flex flex-col gap-1.5`}>
                        <Button label={"Create Team"} />
                    </div>
                </div>

            </div>
        </Container>
    );
};

export default Members;