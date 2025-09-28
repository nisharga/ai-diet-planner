import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateRecipe = mutation({
  args: {
    jsonData: v.any(),
    uid: v.id("users"),
    recipeName: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Insert recipe
    const insertedId = await ctx.db.insert("recipes", {
      jsonData: args.jsonData,
      uid: args.uid, // must match schema key
      recipeName: args.recipeName,
      imageUrl: args.imageUrl,
    });

    // Fetch the full doc so frontend gets everything
    const recipeDoc = await ctx.db.get(insertedId);
    return recipeDoc;
  },
});

export const getByIdRecipe = query({
  args: { id: v.id("recipes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const GetAllRecipes = query({
  handler:async(ctx,args)=>{
    const result = await ctx.db.query('recipes').collect();
    return result
  }
})