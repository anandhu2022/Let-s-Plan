import {ButtonProps} from "@/app/admin/lib/types";

const Button = ({label}: ButtonProps) => {
    return (
        <button className="bg-[#624bff] p-1.5 px-3 rounded-md text-white w-full hover:bg-[#5340d9] transition
        duration-300 ease-out cursor-pointer">
            {label}
        </button>
    );
};

export default Button;