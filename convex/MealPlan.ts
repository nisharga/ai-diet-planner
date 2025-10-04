import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

 


export const CreateMealPlan = mutation({
    args: {
        recipeId: v.id('recipes'),  
        date: v.string(),
        mealType: v.string(),
        uid: v.id('users')
    },
    handler: async (ctx, args) => {
        const { recipeId, date, mealType, uid } = args;      
        const result = await ctx.db.insert('mealPlan', {
            recipeId,
            date,   
            mealType,
            uid
        });
        return result;
    }
});

export const GetTodaysMealPlan = query({
  args: {
    uid: v.id('users'),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    
    const mealPlans = await ctx.db.query("mealPlan")
      .filter(q => 
        q.and(
          q.eq(q.field("uid"), args.uid),
          q.eq(q.field("date"), args.date)
        )
      )
      .collect();

    const result = await Promise.all(
      mealPlans.map(async (mealPlan) => {
        const recipe = await ctx.db.get(mealPlan.recipeId);
        return { ...mealPlan, recipe };
      })
    );
    return result;
  }
});

export const UpdateStatus = mutation({
  args: {
    mealPlanId: v.id('mealPlan'),
    status: v.boolean(),
    calories: v.number()
  },
  handler: async (ctx, args) => {
    
    const updatedMealPlan = await ctx.db.patch(args.mealPlanId, { 
      status: args.status,
      calories: args.status ? args.calories : 0 // Set calories to 0 if status is false
    });
    return updatedMealPlan;
  }
});

export const GetTotalCaloriesConsumed = query({
  args: {
    date: v.string(),
    uid: v.id('users')
  },
  handler: async (ctx, args) => {
    const mealPlansResults = await ctx.db.query("mealPlan")
      .filter(q => 
        q.and(
          q.eq(q.field("uid"), args.uid),
          q.eq(q.field("date"), args.date),
          q.eq(q.field("status"), true) 
        )
      )
      .collect();
      const totalCalories = mealPlansResults.reduce((sum, meal) =>{
        return sum + (meal.calories as number);
      },0);
    return totalCalories;    
  }
});

 