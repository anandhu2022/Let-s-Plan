import Container from "@/app/components/Container";
import Input from "@/app/components/form/Input";

const Client = () => {
    return (
        <Container classNames={`w-full rounded-md flex flex-col gap-3`}>
            <span>Client Details</span>
            <hr/>
            <div className={`flex flex-col gap-1.5`}>
                <label>Client Name:</label>
                <Input id={"client-name"} type={"text"} placeholder={"Client Name"}/>
            </div>
            <div>
                <label>Email:</label>
                <Input id={"client-email"} type={"email"} placeholder={"Email"}/>
                Later . . . . . . . . . Todo
            </div>
        </Container>
    );
};

export default Client;