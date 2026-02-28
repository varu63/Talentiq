import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      const user = await User.findOne({ clerkId });

      if (!user) return res.status(404).json({ message: "User not found" });

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
// import { requireAuth } from "@clerk/express";
// import User from "../models/User.js";

// export const protectRoute = [
//   requireAuth(),
//   async (req, res, next) => {
//     try {
//       const auth = req.auth();
//       const clerkId = auth?.userId;

//       if (!clerkId) {
//         return res.status(401).json({ message: "Unauthorized - invalid token" });
//       }

//       // Try to find existing user
//       let user = await User.findOne({ clerkId });

//       // If user does not exist, create one
//       if (!user) {
//         user = await User.create({
//           clerkId,
//           email: auth.sessionClaims?.email || "",
//           name: auth.sessionClaims?.name || "New User",
//           profileImage: auth.sessionClaims?.image_url || "",
//         });
//       }

//       // Attach user to request
//       req.user = user;

//       next();
//     } catch (error) {
//       console.error("Error in protectRoute middleware:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   },
// ];