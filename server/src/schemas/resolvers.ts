import { IResolvers } from "@graphql-tools/utils";
import { SOP } from "../models/Sop";
import User from "../models/User";
import { ISOP } from "../models/Sop";

interface UpdateSOPArgs {
  id: string;
  title?: string;
  content?: string;
  priority?: string;
  status?: string;
}

interface CreateSOPArgs {
  title: string;
  content: string;
  priority?: string;
}
interface Context {
  user?: {
    id: string;
    role: string;
  };
}

const resolvers: IResolvers = {
  Query: {
    getAllSOPs: async (): Promise<ISOP[]> => {
      return await SOP.find();
    },

    getSOPById: async (
      _parent,
      { id }: { id: string }
    ): Promise<ISOP | null> => {
      return await SOP.findById(id);
    },
    updateUserRole: async (_parent, { userId }, context: Context) => {
      // Check if the logged-in user is an admin
      if (!context.user || context.user.role !== "Administrator") {
        throw new Error("Not authorized");
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  },

  Mutation: {
    createSOP: async (_parent, args: CreateSOPArgs): Promise<ISOP> => {
      const { title, content, priority } = args;
      const newSOP = new SOP({
        title,
        content,
        priority: priority || "medium",
        status: "draft",
      });
      return await newSOP.save();
    },

    updateSOP: async (_parent, args: UpdateSOPArgs): Promise<ISOP | null> => {
      const { id, title, content, priority, status } = args;

      const updatedFields: Partial<ISOP> = {};
      if (title !== undefined) updatedFields.title = title;
      if (content !== undefined) updatedFields.content = content;
      if (priority !== undefined) {
        const allowedPriorities = ["low", "medium", "high"];
        if (allowedPriorities.includes(priority)) {
          updatedFields.priority = priority as "low" | "medium" | "high";
        } else {
          throw new Error("Invalid priority value");
        }
      }
      if (status !== undefined) {
        const allowedStatuses = ["draft", "published", "archived", "completed"];
        if (allowedStatuses.includes(status)) {
          updatedFields.status = status as
            | "draft"
            | "published"
            | "archived"
            | "completed";
        } else {
          throw new Error("Invalid status value");
        }
      }
      updatedFields.updatedAt = new Date();

      return await SOP.findByIdAndUpdate(id, updatedFields, { new: true });
    },

    deleteSOP: async (_parent, { id }: { id: string }): Promise<boolean> => {
      const deleted = await SOP.findByIdAndDelete(id);
      return deleted !== null;
    },
    updateUserRole: async (_parent, { userId, role }, context) => {
      // Check if the logged-in user is an admin
      if (!context.user || context.user.role !== "Administrator") {
        throw new Error("Not authorized");
      }
      const validRoles = ["User", "Reporter", "Auditor", "Administrator"];
      if (!validRoles.includes(role)) {
        throw new Error("Invalid role");
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    },
  },
};

export default resolvers;
