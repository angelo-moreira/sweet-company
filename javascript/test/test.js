import assert from "assert";
import SweetCompany from "../sweet_company.js";

const test_data = [
  {
    packs: [250, 500, 1000, 2000, 5000],
    inputs: [
      { param: 0, ans: [] },
      { param: 250, ans: [250] },
      { param: 250, ans: [250] },
      { param: 251, ans: [500] },
      { param: 501, ans: [500, 250] },
      { param: 1000, ans: [1000] },
      { param: 12001, ans: [5000, 5000, 2000, 250] },
    ],
  },
  {
    packs: [1, 500, 1000, 2000, 5000],
    inputs: [
      { param: 6, ans: [1, 1, 1, 1, 1, 1] },
      { param: 3505, ans: [2000, 1000, 500, 1, 1, 1, 1, 1] },
      {
        param: 48004,
        ans: [
          5000,
          5000,
          5000,
          5000,
          5000,
          5000,
          5000,
          5000,
          5000,
          2000,
          1000,
          1,
          1,
          1,
          1,
        ],
      },
    ],
  },
  {
    packs: [5, 20, 200, 500],
    inputs: [
      { param: 600, ans: [200, 200, 200] },
      {
        param: 833,
        ans: [200, 200, 200, 200, 20, 5, 5, 5],
      },
    ],
  },
];

test_data.forEach(({ packs, inputs, debug }) => {
  describe(`packs are ${packs}`, () => {
    const solution = SweetCompany(packs);

    inputs.forEach(({ param, ans, debug }) => {
      it(`${param} should return ${ans}`, () => {
        const res = solution.order(param);

        // I have experimented with some crazy values :)
        // It turns out the computer was right and I was wrong
        if (debug === true) {
          console.log(res);
        }
        assert.deepStrictEqual(res, ans);
      });
    });
  });
});
