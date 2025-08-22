import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length === 0) {
      const data = {
        email: args.email,
        name: args.name,
        credits: 10,
      };
      const result = await ctx.db.insert("users", {
        ...data,
      });
      return data;
    }
    return user[0];
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return user[0];
  },
});

export const UpdateUserPreference = mutation({
  args: {
    uid: v.id("users"),
    height: v.string(),
    weight: v.string(),
    age: v.string(),
    gender: v.string(),
    goal: v.string(),
    calories: v.number(),
    proteins: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.uid, {
      height: args.height,
      weight: args.weight,
      age: args.age,
      gender: args.gender,
      goal: args.goal,
      calories: args.calories,
      proteins: args.proteins,
    });
    return result
  },
});
