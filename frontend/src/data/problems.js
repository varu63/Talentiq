export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      notes: [
        "Each input has exactly one solution.",
        "You may not use the same element twice.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
}

// Test
console.log(twoSum([2,7,11,15], 9));`
      ,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

print(twoSum([2,7,11,15], 9))`
    },
    expectedOutput: {
      javascript: "[0,1]",
      python: "[0, 1]"
    },
  },
  "valid-anagram": {
  id: "valid-anagram",
  title: "Valid Anagram",
  difficulty: "Easy",
  category: "String • Hash Table",
  description: {
    text: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    notes: [],
  },
  examples: [
    { input: 's = "anagram", t = "nagaram"', output: "true" },
  ],
  constraints: [
    "1 ≤ s.length, t.length ≤ 5 * 10⁴",
  ],
  starterCode: {
    javascript: `function isAnagram(s, t) {
  // Write your solution here
}

console.log(isAnagram("anagram", "nagaram"));`
    ,
    python: `def isAnagram(s, t):
    # Write your solution here
    pass

print(isAnagram("anagram", "nagaram"))`
  },
  expectedOutput: {
    javascript: "true",
    python: "True"
  },
},
"best-time-stock": {
  id: "best-time-stock",
  title: "Best Time to Buy and Sell Stock",
  difficulty: "Easy",
  category: "Array • Dynamic Programming",
  description: {
    text: "You are given an array prices where prices[i] is the price of a stock on day i. Return the maximum profit you can achieve.",
    notes: ["You may complete at most one transaction."],
  },
  examples: [
    { input: "prices = [7,1,5,3,6,4]", output: "5" },
  ],
  constraints: [
    "1 ≤ prices.length ≤ 10⁵",
  ],
  starterCode: {
    javascript: `function maxProfit(prices) {
  // Write your solution here
}

console.log(maxProfit([7,1,5,3,6,4]));`
    ,
    python: `def maxProfit(prices):
    # Write your solution here
    pass

print(maxProfit([7,1,5,3,6,4]))`
  },
  expectedOutput: {
    javascript: "5",
    python: "5"
  },
},

  "merge-intervals": {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array • Sorting",
    description: {
      text: "Given an array of intervals, merge all overlapping intervals.",
      notes: [],
    },
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function merge(intervals) {
  // Write your solution here
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));`
      ,
      python: `def merge(intervals):
    # Write your solution here
    pass

print(merge([[1,3],[2,6],[8,10],[15,18]]))`
    },
    expectedOutput: {
      javascript: "[[1,6],[8,10],[15,18]]",
      python: "[[1, 6], [8, 10], [15, 18]]"
    },
  },
"three-sum": {
  id: "three-sum",
  title: "3Sum",
  difficulty: "Medium",
  category: "Array • Two Pointers",
  description: {
    text: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that they add up to 0.",
    notes: ["The solution set must not contain duplicate triplets."],
  },
  examples: [
    { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
  ],
  constraints: [
    "3 ≤ nums.length ≤ 3000",
  ],
  starterCode: {
    javascript: `function threeSum(nums) {
  // Write your solution here
}

console.log(threeSum([-1,0,1,2,-1,-4]));`
    ,
    python: `def threeSum(nums):
    # Write your solution here
    pass

print(threeSum([-1,0,1,2,-1,-4]))`
  },
  expectedOutput: {
    javascript: "[[-1,-1,2],[-1,0,1]]",
    python: "[[-1, -1, 2], [-1, 0, 1]]"
  },
},
"product-except-self": {
  id: "product-except-self",
  title: "Product of Array Except Self",
  difficulty: "Medium",
  category: "Array • Prefix Sum",
  description: {
    text: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements except nums[i].",
    notes: ["You must solve it without using division."],
  },
  examples: [
    { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁵",
  ],
  starterCode: {
    javascript: `function productExceptSelf(nums) {
  // Write your solution here
}

console.log(productExceptSelf([1,2,3,4]));`
    ,
    python: `def productExceptSelf(nums):
    # Write your solution here
    pass

print(productExceptSelf([1,2,3,4]))`
  },
  expectedOutput: {
    javascript: "[24,12,8,6]",
    python: "[24, 12, 8, 6]"
  },
},
  "longest-substring": {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String • Sliding Window",
    description: {
      text: "Given a string s, find the length of the longest substring without repeating characters.",
      notes: [],
    },
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
      },
    ],
    constraints: [
      "0 ≤ s.length ≤ 5 * 10⁴",
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
}

console.log(lengthOfLongestSubstring("abcabcbb"));`
      ,
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

print(lengthOfLongestSubstring("abcabcbb"))`
    },
    expectedOutput: {
      javascript: "3",
      python: "3"
    },
  },

  "climbing-stairs": {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    description: {
      text: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
      notes: [],
    },
    examples: [
      {
        input: "n = 3",
        output: "3",
      },
    ],
    constraints: [
      "1 ≤ n ≤ 45",
    ],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your solution here
}

console.log(climbStairs(3));`
      ,
      python: `def climbStairs(n):
    # Write your solution here
    pass

print(climbStairs(3))`
    },
    expectedOutput: {
      javascript: "3",
      python: "3"
    },
  },
  "trapping-rain-water": {
  id: "trapping-rain-water",
  title: "Trapping Rain Water",
  difficulty: "Hard",
  category: "Array • Two Pointers • Dynamic Programming",
  description: {
    text: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    notes: [],
  },
  examples: [
    { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
  ],
  constraints: [
    "1 ≤ height.length ≤ 2 * 10⁴",
  ],
  starterCode: {
    javascript: `function trap(height) {
  // Write your solution here
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));`
    ,
    python: `def trap(height):
    # Write your solution here
    pass

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))`
  },
  expectedOutput: {
    javascript: "6",
    python: "6"
  },
},
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
};