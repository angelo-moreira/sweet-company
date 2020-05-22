class Order:
    def __init__(self, amount, total, packs):
        self.amount = amount
        self.total_in_packs = total
        self.packs = packs

    def wastage(self):
        return self.total_in_packs - self.amount


class SweetCompany:
    def __init__(self, pack_sizes):
        # we assume the packs are not going to be sorted, this is a O(NlogN) operation depending on the sorting algo,
        # performance can be improved if we can be sure the pack_sizes are sorted
        pack_sizes.sort()
        self.pack_sizes = pack_sizes

    def order(self, amount):
        if amount == 0:
            return []

        if amount < self.pack_sizes[0]:
            return [self.pack_sizes[0]]

        (matching, qualifying_packs) = self._qualifying_packs(amount)
        if matching:
            return qualifying_packs

        pointer = len(qualifying_packs) - 1

        possible_solutions = []
        solution = []
        total = 0

        while pointer > -1:
            curr_pack = qualifying_packs[pointer]

            solution.append(curr_pack)
            total += curr_pack

            if total >= amount:
                order = Order(amount, total, [pack for pack in solution])
                possible_solutions.append(order)

                solution.pop()
                total -= curr_pack
                pointer -= 1
                continue

        return self._optimum_solution(possible_solutions)

    # min is not going to achieve what we want GET RID OF IT
    def _optimum_solution(self, maybes):
        solution = maybes.pop()

        for order in maybes:
            if order.wastage() <= solution.wastage() and len(order.packs) < len(solution.packs):
                solution = order

        return solution.packs

    # returns a tuple (True, Pack) if an exact match was found
    # returns a tuple (False, list_of_packs) because we are not going to need to loop over everything
    def _qualifying_packs(self, amount):
        for (index, pack) in enumerate(self.pack_sizes):
            if pack == amount:
                return (True, [pack])
            if pack > amount:
                return (False, self.pack_sizes[:index+1])

        return (False, self.pack_sizes)
