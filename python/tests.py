from sweet_company import SweetCompany

packs = [250, 500, 1000, 2000, 5000]
solution = SweetCompany(packs)

right_ans = [250]
ans = solution.order(1)
print(right_ans == ans)

right_ans = [250]
ans = solution.order(250)
print(right_ans == ans)

right_ans = [1000]
ans = solution.order(1000)
print(right_ans == ans)

right_ans = [500]
ans = solution.order(251)
print(right_ans == ans)

right_ans = [500, 250]
ans = solution.order(501)
print(right_ans == ans)

right_ans = [5000, 5000, 2000, 250]
ans = solution.order(12001)
print(right_ans == ans)

right_ans = []
ans = solution.order(0)
print(right_ans == ans)


packs = [1, 500, 1000, 2000, 5000]
solution = SweetCompany(packs)

right_ans = [1, 1, 1, 1, 1, 1]
ans = solution.order(6)
print(right_ans == ans)

right_ans = [2000, 1000, 500, 1, 1, 1, 1, 1]
ans = solution.order(3505)
print(right_ans == ans)

right_ans = [5000, 5000, 5000, 5000, 5000, 5000,
             5000, 5000, 5000, 2000, 1000, 1, 1, 1, 1]
ans = solution.order(48004)
print(right_ans == ans)


packs = [10, 20, 200, 500]
solution = SweetCompany(packs)

right_ans = [200, 200, 200]
ans = solution.order(600)
print(right_ans == ans)
