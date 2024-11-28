import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    const createMyUserRequest = async (user:CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if(!response.ok) {
            throw new Error("failed to create user");
        }
    };

    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    };

};

type updateMyUserRequest = {
    name : string;
    addressLane1 : string;
    city : string;
    country : string;
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = async (formData: updateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        // console.log("Access Token:", accessToken);
        
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),         
        });

        // console.log("Headers:", {
        //     Authorization: `Bearer ${accessToken}`,
        //     "Content-Type": "application/json",
        // });
        // console.log("Payload:", JSON.stringify(formData));
        
        // console.log(`${API_BASE_URL}/api/my/user`);

        // console.log(formData);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Error Response:", errorData);
            throw new Error("Failed to update user");
        }

    };
    
    const { mutateAsync: updateUser, 
        isLoading, 
        isError, 
        error 
    } = useMutation(updateMyUserRequest);

    if (isError) {
        console.error("Mutation Error:", error);
    }

      return{ updateUser, isLoading };
};