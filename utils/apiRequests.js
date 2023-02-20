import { useQuery } from "react-query";
import { userProfileImages } from "../data/userData";

export const getUsers = () => {
  return useQuery("userStoryData", async () => {
    try {
      let response = await fetch("https://dummyjson.com/users");
      let json = await response.json();
      let dataNeeded = json.users
        .slice(0, 5)
        .map(({ username, id }, index) => ({
          username,
          id,
          // Update each image to look like real people for instagram feel
          image: userProfileImages[index].user,
        }));

      return dataNeeded;
    } catch {
      (error) => error;
    }
  });
};
