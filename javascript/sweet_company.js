const Order = (amount, total, packs) => {
  return {
    total: total,
    amount: amount,
    packs: packs,
    wastage: () => {
      return total - amount;
    },
  };
};

const SweetCompany = (pack_sizes) => {
  pack_sizes.sort((a, b) => a - b);

  const order = (amount) => {
    if (amount == 0) {
      return [];
    }
    if (pack_sizes.includes(amount)) {
      return [amount];
    }

    // We will need 2 pointers to use the sliding_window technique
    let pointer_end = pack_sizes.length - 1;
    let pointer_start = pointer_end;

    const possible_solutions = [];
    let solution = [];
    let total = 0;

    let curr_pack;
    while (pointer_end > -1) {
      curr_pack = pack_sizes[pointer_start];

      solution.push(curr_pack);
      total += curr_pack;

      if (total >= amount) {
        possible_solutions.push(
          Order(
            amount,
            total,
            solution.map((item) => item)
          )
        );
        solution.pop();

        total -= curr_pack;
        pointer_start--;

        // the pointer start has been travelling down the list to find matching combination
        // it is now at the start of the list so we want to bring the end_pointer down
        if (pointer_start == -1) {
          pointer_end--;
          pointer_start = pointer_end;
          solution = [];
          total = 0;
          continue;
        }
      }
    }

    return optimum_solution(possible_solutions);
  };

  // returns the solution where there is less spilage possible
  // delivering the less packs as possible between all the possible combinations
  const optimum_solution = (possibles) => {
    const { packs: solution } = possibles.reduce(
      ({ packs: packs_prev, wastage: wastage_prev }, { packs, wastage }) => {
        const [same_waste, less_waste, less_packs] = [
          wastage() == wastage_prev(),
          wastage() < wastage_prev(),
          packs.length < packs_prev.length,
        ];

        return less_waste || (same_waste && less_packs)
          ? { packs: packs, wastage: wastage }
          : { packs: packs_prev, wastage: wastage_prev };
      }
    );

    return solution;
  };

  return {
    order: order,
  };
};

export default SweetCompany;
