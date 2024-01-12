import { useState } from "react";

const GameQuestions = () => {
  const [text] =
    useState(`Given an array of integers nums and an integer target, 
    return indices of the two numbers such that they add up to target. 
    You may assume that each input would have exactly one solution, 
    and you may not use the same element twice. You can return the answer in any order.
    Example 1: Input: nums = [2,7,11,15], target = 9 Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1]. There
    are n children standing in a line. Each child is assigned a rating
    value given in the integer array ratings. You are giving candies to
    these children subjected to the following requirements: Each child
    must have at least one candy. Children with a higher rating get more
    candies than their neighbors. Return the minimum number of candies you
    need to have to distribute the candies to the children.`);

  return (
    <>
      <h4>Question:</h4>
      <div className="input-box">
        <textarea readOnly id="code-inp" defaultValue={text} />
      </div>
    </>
  );
};

export default GameQuestions;
