-- ─── Capucor Seed Data ────────────────────────────────────────────────────────
-- Safe to re-run — all inserts use ON CONFLICT with appropriate DO clauses.
-- Edit values freely in the Supabase Table Editor after launch.

-- ─── Services ─────────────────────────────────────────────────────────────────

insert into public.services
  (slug, name, description, bracket_unit_label, display_order)
values
  ('accounting',  'Accounting',  'Annual financial statements, tax compliance, and ongoing ledger management.', 'Annual revenue',         1),
  ('bookkeeping', 'Bookkeeping', 'Monthly transaction categorisation, reconciliation, and management reporting.', 'Monthly transactions',   2),
  ('payroll',     'Payroll',     'End-to-end payroll processing, IRP5s, PAYE and UIF submissions.',             'Active employees',       3)
on conflict (slug) do nothing;

-- ─── Tiers ────────────────────────────────────────────────────────────────────

insert into public.tiers (slug, name, tagline, multiplier, display_order)
values
  ('basic',   'Basic',   'Core compliance, handled.',               1.00, 1),
  ('pro',     'Pro',     'Deeper insight, broader coverage.',       1.30, 2),
  ('premium', 'Premium', 'Full advisory partnership.',              2.10, 3)
on conflict (slug) do nothing;

-- ─── Brackets — Accounting (annual revenue, 26 rows) ─────────────────────────

insert into public.brackets
  (service_slug, ordinal, label, is_enterprise, display_order, basic_price, pro_price, premium_price)
values
  ('accounting',  0, 'Dormant',            false,  0,   500.00,   650.00,  1050.00),
  ('accounting',  1, '0 – 1 Mil',          false,  1,   725.00,   950.00,  1525.00),
  ('accounting',  2, '1 Mil – 2.5 Mil',    false,  2,   950.00,  1250.00,  2000.00),
  ('accounting',  3, '2.5 Mil – 5 Mil',    false,  3,  1175.00,  1550.00,  2475.00),
  ('accounting',  4, '5 Mil – 10 Mil',     false,  4,  1400.00,  1825.00,  2950.00),
  ('accounting',  5, '10 Mil – 15 Mil',    false,  5,  1625.00,  2125.00,  3425.00),
  ('accounting',  6, '15 Mil – 20 Mil',    false,  6,  1850.00,  2425.00,  3900.00),
  ('accounting',  7, '20 Mil – 25 Mil',    false,  7,  2075.00,  2700.00,  4375.00),
  ('accounting',  8, '25 Mil – 30 Mil',    false,  8,  2300.00,  3000.00,  4850.00),
  ('accounting',  9, '30 Mil – 35 Mil',    false,  9,  2525.00,  3300.00,  5325.00),
  ('accounting', 10, '35 Mil – 40 Mil',    false, 10,  2750.00,  3575.00,  5775.00),
  ('accounting', 11, '40 Mil – 45 Mil',    false, 11,  2975.00,  3875.00,  6250.00),
  ('accounting', 12, '45 Mil – 50 Mil',    false, 12,  3200.00,  4175.00,  6725.00),
  ('accounting', 13, '50 Mil – 75 Mil',    false, 13,  3425.00,  4475.00,  7200.00),
  ('accounting', 14, '75 Mil – 100 Mil',   false, 14,  3650.00,  4750.00,  7675.00),
  ('accounting', 15, '100 Mil – 125 Mil',  false, 15,  3875.00,  5050.00,  8150.00),
  ('accounting', 16, '125 Mil – 150 Mil',  false, 16,  4100.00,  5350.00,  8625.00),
  ('accounting', 17, '150 Mil – 175 Mil',  false, 17,  4325.00,  5625.00,  9100.00),
  ('accounting', 18, '175 Mil – 200 Mil',  false, 18,  4550.00,  5925.00,  9575.00),
  ('accounting', 19, '200 Mil – 225 Mil',  false, 19,  4775.00,  6225.00, 10050.00),
  ('accounting', 20, '225 Mil – 250 Mil',  false, 20,  5000.00,  6500.00, 10500.00),
  ('accounting', 21, '250 Mil – 275 Mil',  false, 21,  5225.00,  6800.00, 10975.00),
  ('accounting', 22, '275 Mil – 300 Mil',  false, 22,  5450.00,  7100.00, 11450.00),
  ('accounting', 23, '300 Mil – 325 Mil',  false, 23,  5675.00,  7400.00, 11925.00),
  ('accounting', 24, '325 Mil – 350 Mil',  false, 24,  5900.00,  7675.00, 12400.00),
  ('accounting', 25, '350 Mil+',           false, 25,  6125.00,  7975.00, 12875.00)
on conflict (service_slug, ordinal) do update set
  label         = excluded.label,
  basic_price   = excluded.basic_price,
  pro_price     = excluded.pro_price,
  premium_price = excluded.premium_price;

-- ─── Brackets — Bookkeeping (monthly transactions, 60 rows) ──────────────────

insert into public.brackets
  (service_slug, ordinal, label, is_enterprise, display_order, basic_price, pro_price, premium_price)
values
  ('bookkeeping',  0, 'Dormant',      false,  0,     0.00,     0.00,     0.00),
  ('bookkeeping',  1, 'Up to 50',     false,  1,   850.00,  1125.00,  1800.00),
  ('bookkeeping',  2, 'Up to 75',     false,  2,  1050.00,  1375.00,  2225.00),
  ('bookkeeping',  3, 'Up to 100',    false,  3,  1250.00,  1625.00,  2625.00),
  ('bookkeeping',  4, 'Up to 125',    false,  4,  1450.00,  1900.00,  3050.00),
  ('bookkeeping',  5, 'Up to 150',    false,  5,  1650.00,  2150.00,  3475.00),
  ('bookkeeping',  6, 'Up to 175',    false,  6,  1850.00,  2425.00,  3900.00),
  ('bookkeeping',  7, 'Up to 200',    false,  7,  2050.00,  2675.00,  4325.00),
  ('bookkeeping',  8, 'Up to 225',    false,  8,  2250.00,  2925.00,  4725.00),
  ('bookkeeping',  9, 'Up to 250',    false,  9,  2450.00,  3200.00,  5150.00),
  ('bookkeeping', 10, 'Up to 275',    false, 10,  2650.00,  3450.00,  5575.00),
  ('bookkeeping', 11, 'Up to 300',    false, 11,  2850.00,  3725.00,  6000.00),
  ('bookkeeping', 12, 'Up to 325',    false, 12,  3050.00,  3975.00,  6425.00),
  ('bookkeeping', 13, 'Up to 350',    false, 13,  3250.00,  4225.00,  6825.00),
  ('bookkeeping', 14, 'Up to 375',    false, 14,  3450.00,  4500.00,  7250.00),
  ('bookkeeping', 15, 'Up to 400',    false, 15,  3650.00,  4750.00,  7675.00),
  ('bookkeeping', 16, 'Up to 425',    false, 16,  3850.00,  5025.00,  8100.00),
  ('bookkeeping', 17, 'Up to 450',    false, 17,  4050.00,  5275.00,  8525.00),
  ('bookkeeping', 18, 'Up to 475',    false, 18,  4250.00,  5525.00,  8925.00),
  ('bookkeeping', 19, 'Up to 500',    false, 19,  4450.00,  5800.00,  9350.00),
  ('bookkeeping', 20, 'Up to 525',    false, 20,  4650.00,  6050.00,  9775.00),
  ('bookkeeping', 21, 'Up to 550',    false, 21,  4850.00,  6325.00, 10200.00),
  ('bookkeeping', 22, 'Up to 575',    false, 22,  5050.00,  6575.00, 10625.00),
  ('bookkeeping', 23, 'Up to 600',    false, 23,  5250.00,  6825.00, 11025.00),
  ('bookkeeping', 24, 'Up to 625',    false, 24,  5450.00,  7100.00, 11450.00),
  ('bookkeeping', 25, 'Up to 650',    false, 25,  5650.00,  7350.00, 11875.00),
  ('bookkeeping', 26, 'Up to 675',    false, 26,  5850.00,  7625.00, 12300.00),
  ('bookkeeping', 27, 'Up to 700',    false, 27,  6050.00,  7875.00, 12725.00),
  ('bookkeeping', 28, 'Up to 725',    false, 28,  6250.00,  8125.00, 13125.00),
  ('bookkeeping', 29, 'Up to 750',    false, 29,  6450.00,  8400.00, 13550.00),
  ('bookkeeping', 30, 'Up to 775',    false, 30,  6650.00,  8650.00, 13975.00),
  ('bookkeeping', 31, 'Up to 800',    false, 31,  6850.00,  8925.00, 14400.00),
  ('bookkeeping', 32, 'Up to 825',    false, 32,  7050.00,  9175.00, 14825.00),
  ('bookkeeping', 33, 'Up to 850',    false, 33,  7250.00,  9425.00, 15225.00),
  ('bookkeeping', 34, 'Up to 875',    false, 34,  7450.00,  9700.00, 15650.00),
  ('bookkeeping', 35, 'Up to 900',    false, 35,  7650.00,  9950.00, 16075.00),
  ('bookkeeping', 36, 'Up to 925',    false, 36,  7850.00, 10225.00, 16500.00),
  ('bookkeeping', 37, 'Up to 950',    false, 37,  8050.00, 10475.00, 16925.00),
  ('bookkeeping', 38, 'Up to 975',    false, 38,  8250.00, 10725.00, 17325.00),
  ('bookkeeping', 39, 'Up to 1000',   false, 39,  8450.00, 11000.00, 17750.00),
  ('bookkeeping', 40, 'Up to 1025',   false, 40,  8650.00, 11250.00, 18175.00),
  ('bookkeeping', 41, 'Up to 1050',   false, 41,  8850.00, 11525.00, 18600.00),
  ('bookkeeping', 42, 'Up to 1075',   false, 42,  9050.00, 11775.00, 19025.00),
  ('bookkeeping', 43, 'Up to 1100',   false, 43,  9250.00, 12025.00, 19425.00),
  ('bookkeeping', 44, 'Up to 1125',   false, 44,  9450.00, 12300.00, 19850.00),
  ('bookkeeping', 45, 'Up to 1150',   false, 45,  9650.00, 12550.00, 20275.00),
  ('bookkeeping', 46, 'Up to 1175',   false, 46,  9850.00, 12825.00, 20700.00),
  ('bookkeeping', 47, 'Up to 1200',   false, 47, 10050.00, 13075.00, 21125.00),
  ('bookkeeping', 48, 'Up to 1225',   false, 48, 10250.00, 13325.00, 21525.00),
  ('bookkeeping', 49, 'Up to 1250',   false, 49, 10450.00, 13600.00, 21950.00),
  ('bookkeeping', 50, 'Up to 1275',   false, 50, 10650.00, 13850.00, 22375.00),
  ('bookkeeping', 51, 'Up to 1300',   false, 51, 10850.00, 14125.00, 22800.00),
  ('bookkeeping', 52, 'Up to 1325',   false, 52, 11050.00, 14375.00, 23225.00),
  ('bookkeeping', 53, 'Up to 1350',   false, 53, 11250.00, 14625.00, 23625.00),
  ('bookkeeping', 54, 'Up to 1375',   false, 54, 11450.00, 14900.00, 24050.00),
  ('bookkeeping', 55, 'Up to 1400',   false, 55, 11650.00, 15150.00, 24475.00),
  ('bookkeeping', 56, 'Up to 1425',   false, 56, 11850.00, 15425.00, 24900.00),
  ('bookkeeping', 57, 'Up to 1450',   false, 57, 12050.00, 15675.00, 25325.00),
  ('bookkeeping', 58, 'Up to 1475',   false, 58, 12250.00, 15925.00, 25725.00),
  ('bookkeeping', 59, 'Up to 1500',   false, 59, 12450.00, 16200.00, 26150.00)
on conflict (service_slug, ordinal) do update set
  label         = excluded.label,
  basic_price   = excluded.basic_price,
  pro_price     = excluded.pro_price,
  premium_price = excluded.premium_price;

-- ─── Brackets — Payroll (active employees, 101 rows) ─────────────────────────

insert into public.brackets
  (service_slug, ordinal, label, is_enterprise, display_order, basic_price, pro_price, premium_price)
values
  ('payroll',   0, 'Dormant',         false,   0,   250.00,   325.00,   525.00),
  ('payroll',   1, 'Employees: 1',    false,   1,   450.00,   600.00,   950.00),
  ('payroll',   2, 'Employees: 2',    false,   2,   525.00,   700.00,  1125.00),
  ('payroll',   3, 'Employees: 3',    false,   3,   600.00,   800.00,  1275.00),
  ('payroll',   4, 'Employees: 4',    false,   4,   675.00,   900.00,  1425.00),
  ('payroll',   5, 'Employees: 5',    false,   5,   750.00,   975.00,  1575.00),
  ('payroll',   6, 'Employees: 6',    false,   6,   825.00,  1075.00,  1750.00),
  ('payroll',   7, 'Employees: 7',    false,   7,   900.00,  1175.00,  1900.00),
  ('payroll',   8, 'Employees: 8',    false,   8,   975.00,  1275.00,  2050.00),
  ('payroll',   9, 'Employees: 9',    false,   9,  1050.00,  1375.00,  2225.00),
  ('payroll',  10, 'Employees: 10',   false,  10,  1125.00,  1475.00,  2375.00),
  ('payroll',  11, 'Employees: 11',   false,  11,  1200.00,  1575.00,  2525.00),
  ('payroll',  12, 'Employees: 12',   false,  12,  1275.00,  1675.00,  2700.00),
  ('payroll',  13, 'Employees: 13',   false,  13,  1350.00,  1775.00,  2850.00),
  ('payroll',  14, 'Employees: 14',   false,  14,  1425.00,  1875.00,  3000.00),
  ('payroll',  15, 'Employees: 15',   false,  15,  1500.00,  1950.00,  3150.00),
  ('payroll',  16, 'Employees: 16',   false,  16,  1575.00,  2050.00,  3325.00),
  ('payroll',  17, 'Employees: 17',   false,  17,  1650.00,  2150.00,  3475.00),
  ('payroll',  18, 'Employees: 18',   false,  18,  1725.00,  2250.00,  3625.00),
  ('payroll',  19, 'Employees: 19',   false,  19,  1800.00,  2350.00,  3800.00),
  ('payroll',  20, 'Employees: 20',   false,  20,  1875.00,  2450.00,  3950.00),
  ('payroll',  21, 'Employees: 21',   false,  21,  1950.00,  2550.00,  4100.00),
  ('payroll',  22, 'Employees: 22',   false,  22,  2025.00,  2650.00,  4275.00),
  ('payroll',  23, 'Employees: 23',   false,  23,  2100.00,  2750.00,  4425.00),
  ('payroll',  24, 'Employees: 24',   false,  24,  2175.00,  2850.00,  4575.00),
  ('payroll',  25, 'Employees: 25',   false,  25,  2250.00,  2925.00,  4725.00),
  ('payroll',  26, 'Employees: 26',   false,  26,  2325.00,  3025.00,  4900.00),
  ('payroll',  27, 'Employees: 27',   false,  27,  2400.00,  3125.00,  5050.00),
  ('payroll',  28, 'Employees: 28',   false,  28,  2475.00,  3225.00,  5200.00),
  ('payroll',  29, 'Employees: 29',   false,  29,  2550.00,  3325.00,  5375.00),
  ('payroll',  30, 'Employees: 30',   false,  30,  2625.00,  3425.00,  5525.00),
  ('payroll',  31, 'Employees: 31',   false,  31,  2700.00,  3525.00,  5675.00),
  ('payroll',  32, 'Employees: 32',   false,  32,  2775.00,  3625.00,  5850.00),
  ('payroll',  33, 'Employees: 33',   false,  33,  2850.00,  3725.00,  6000.00),
  ('payroll',  34, 'Employees: 34',   false,  34,  2925.00,  3825.00,  6150.00),
  ('payroll',  35, 'Employees: 35',   false,  35,  3000.00,  3900.00,  6300.00),
  ('payroll',  36, 'Employees: 36',   false,  36,  3075.00,  4000.00,  6475.00),
  ('payroll',  37, 'Employees: 37',   false,  37,  3150.00,  4100.00,  6625.00),
  ('payroll',  38, 'Employees: 38',   false,  38,  3225.00,  4200.00,  6775.00),
  ('payroll',  39, 'Employees: 39',   false,  39,  3300.00,  4300.00,  6950.00),
  ('payroll',  40, 'Employees: 40',   false,  40,  3375.00,  4400.00,  7100.00),
  ('payroll',  41, 'Employees: 41',   false,  41,  3450.00,  4500.00,  7250.00),
  ('payroll',  42, 'Employees: 42',   false,  42,  3525.00,  4600.00,  7425.00),
  ('payroll',  43, 'Employees: 43',   false,  43,  3600.00,  4700.00,  7575.00),
  ('payroll',  44, 'Employees: 44',   false,  44,  3675.00,  4800.00,  7725.00),
  ('payroll',  45, 'Employees: 45',   false,  45,  3750.00,  4875.00,  7875.00),
  ('payroll',  46, 'Employees: 46',   false,  46,  3825.00,  4975.00,  8050.00),
  ('payroll',  47, 'Employees: 47',   false,  47,  3900.00,  5075.00,  8200.00),
  ('payroll',  48, 'Employees: 48',   false,  48,  3975.00,  5175.00,  8350.00),
  ('payroll',  49, 'Employees: 49',   false,  49,  4050.00,  5275.00,  8525.00),
  ('payroll',  50, 'Employees: 50',   false,  50,  4125.00,  5375.00,  8675.00),
  ('payroll',  51, 'Employees: 51',   false,  51,  4200.00,  5475.00,  8825.00),
  ('payroll',  52, 'Employees: 52',   false,  52,  4275.00,  5575.00,  9000.00),
  ('payroll',  53, 'Employees: 53',   false,  53,  4350.00,  5675.00,  9150.00),
  ('payroll',  54, 'Employees: 54',   false,  54,  4425.00,  5775.00,  9300.00),
  ('payroll',  55, 'Employees: 55',   false,  55,  4500.00,  5850.00,  9450.00),
  ('payroll',  56, 'Employees: 56',   false,  56,  4575.00,  5950.00,  9625.00),
  ('payroll',  57, 'Employees: 57',   false,  57,  4650.00,  6050.00,  9775.00),
  ('payroll',  58, 'Employees: 58',   false,  58,  4725.00,  6150.00,  9925.00),
  ('payroll',  59, 'Employees: 59',   false,  59,  4800.00,  6250.00, 10100.00),
  ('payroll',  60, 'Employees: 60',   false,  60,  4875.00,  6350.00, 10250.00),
  ('payroll',  61, 'Employees: 61',   false,  61,  4950.00,  6450.00, 10400.00),
  ('payroll',  62, 'Employees: 62',   false,  62,  5025.00,  6550.00, 10575.00),
  ('payroll',  63, 'Employees: 63',   false,  63,  5100.00,  6650.00, 10725.00),
  ('payroll',  64, 'Employees: 64',   false,  64,  5175.00,  6750.00, 10875.00),
  ('payroll',  65, 'Employees: 65',   false,  65,  5250.00,  6825.00, 11025.00),
  ('payroll',  66, 'Employees: 66',   false,  66,  5325.00,  6925.00, 11200.00),
  ('payroll',  67, 'Employees: 67',   false,  67,  5400.00,  7025.00, 11350.00),
  ('payroll',  68, 'Employees: 68',   false,  68,  5475.00,  7125.00, 11500.00),
  ('payroll',  69, 'Employees: 69',   false,  69,  5550.00,  7225.00, 11675.00),
  ('payroll',  70, 'Employees: 70',   false,  70,  5625.00,  7325.00, 11825.00),
  ('payroll',  71, 'Employees: 71',   false,  71,  5700.00,  7425.00, 11975.00),
  ('payroll',  72, 'Employees: 72',   false,  72,  5775.00,  7525.00, 12150.00),
  ('payroll',  73, 'Employees: 73',   false,  73,  5850.00,  7625.00, 12300.00),
  ('payroll',  74, 'Employees: 74',   false,  74,  5925.00,  7725.00, 12450.00),
  ('payroll',  75, 'Employees: 75',   false,  75,  6000.00,  7800.00, 12600.00),
  ('payroll',  76, 'Employees: 76',   false,  76,  6075.00,  7900.00, 12775.00),
  ('payroll',  77, 'Employees: 77',   false,  77,  6150.00,  8000.00, 12925.00),
  ('payroll',  78, 'Employees: 78',   false,  78,  6225.00,  8100.00, 13075.00),
  ('payroll',  79, 'Employees: 79',   false,  79,  6300.00,  8200.00, 13250.00),
  ('payroll',  80, 'Employees: 80',   false,  80,  6375.00,  8300.00, 13400.00),
  ('payroll',  81, 'Employees: 81',   false,  81,  6450.00,  8400.00, 13550.00),
  ('payroll',  82, 'Employees: 82',   false,  82,  6525.00,  8500.00, 13725.00),
  ('payroll',  83, 'Employees: 83',   false,  83,  6600.00,  8600.00, 13875.00),
  ('payroll',  84, 'Employees: 84',   false,  84,  6675.00,  8700.00, 14025.00),
  ('payroll',  85, 'Employees: 85',   false,  85,  6750.00,  8775.00, 14175.00),
  ('payroll',  86, 'Employees: 86',   false,  86,  6825.00,  8875.00, 14350.00),
  ('payroll',  87, 'Employees: 87',   false,  87,  6900.00,  8975.00, 14500.00),
  ('payroll',  88, 'Employees: 88',   false,  88,  6975.00,  9075.00, 14650.00),
  ('payroll',  89, 'Employees: 89',   false,  89,  7050.00,  9175.00, 14825.00),
  ('payroll',  90, 'Employees: 90',   false,  90,  7125.00,  9275.00, 14975.00),
  ('payroll',  91, 'Employees: 91',   false,  91,  7200.00,  9375.00, 15125.00),
  ('payroll',  92, 'Employees: 92',   false,  92,  7275.00,  9475.00, 15300.00),
  ('payroll',  93, 'Employees: 93',   false,  93,  7350.00,  9575.00, 15450.00),
  ('payroll',  94, 'Employees: 94',   false,  94,  7425.00,  9675.00, 15600.00),
  ('payroll',  95, 'Employees: 95',   false,  95,  7500.00,  9750.00, 15750.00),
  ('payroll',  96, 'Employees: 96',   false,  96,  7575.00,  9850.00, 15925.00),
  ('payroll',  97, 'Employees: 97',   false,  97,  7650.00,  9950.00, 16075.00),
  ('payroll',  98, 'Employees: 98',   false,  98,  7725.00, 10050.00, 16225.00),
  ('payroll',  99, 'Employees: 99',   false,  99,  7800.00, 10150.00, 16400.00),
  ('payroll', 100, 'Employees: 100',  false, 100,  7875.00, 10250.00, 16550.00)
on conflict (service_slug, ordinal) do update set
  label         = excluded.label,
  basic_price   = excluded.basic_price,
  pro_price     = excluded.pro_price,
  premium_price = excluded.premium_price;

-- ─── Tier Inclusions — Accounting ─────────────────────────────────────────────

insert into public.tier_inclusions (tier_slug, service_slug, inclusion, display_order)
values
  ('basic',   'accounting', 'Monthly bookkeeping review',           1),
  ('basic',   'accounting', 'Annual financial statements',          2),
  ('basic',   'accounting', 'Corporate income tax return',          3),
  ('pro',     'accounting', 'Everything in Basic',                  1),
  ('pro',     'accounting', 'Quarterly management accounts',        2),
  ('pro',     'accounting', 'VAT201 submissions',                   3),
  ('pro',     'accounting', 'Provisional tax',                      4),
  ('premium', 'accounting', 'Everything in Pro',                    1),
  ('premium', 'accounting', 'Monthly management accounts',          2),
  ('premium', 'accounting', 'Advisory calls included',              3),
  ('premium', 'accounting', 'Budget & cash-flow forecasting',       4)
on conflict (tier_slug, service_slug, inclusion) do nothing;

-- ─── Tier Inclusions — Bookkeeping ────────────────────────────────────────────

insert into public.tier_inclusions (tier_slug, service_slug, inclusion, display_order)
values
  ('basic',   'bookkeeping', 'Categorisation & reconciliation',     1),
  ('basic',   'bookkeeping', 'Monthly trial balance',               2),
  ('basic',   'bookkeeping', 'Bank reconciliation',                 3),
  ('pro',     'bookkeeping', 'Everything in Basic',                 1),
  ('pro',     'bookkeeping', 'Bi-annual management reports',        2),
  ('pro',     'bookkeeping', 'Expense reporting',                   3),
  ('pro',     'bookkeeping', 'Creditor/debtor summaries',           4),
  ('premium', 'bookkeeping', 'Everything in Pro',                   1),
  ('premium', 'bookkeeping', 'Real-time Syft dashboard',            2),
  ('premium', 'bookkeeping', 'Weekly reconciliation',               3),
  ('premium', 'bookkeeping', 'Cash-flow reporting',                 4)
on conflict (tier_slug, service_slug, inclusion) do nothing;

-- ─── Tier Inclusions — Payroll ────────────────────────────────────────────────

insert into public.tier_inclusions (tier_slug, service_slug, inclusion, display_order)
values
  ('basic',   'payroll', 'Monthly payroll processing',              1),
  ('basic',   'payroll', 'IRP5 certificates',                       2),
  ('basic',   'payroll', 'PAYE submissions',                        3),
  ('pro',     'payroll', 'Everything in Basic',                     1),
  ('pro',     'payroll', 'SDL & UIF submissions',                   2),
  ('pro',     'payroll', 'Leave management',                        3),
  ('pro',     'payroll', 'Payslip distribution',                    4),
  ('premium', 'payroll', 'Everything in Pro',                       1),
  ('premium', 'payroll', 'HR policy templates',                     2),
  ('premium', 'payroll', 'Onboarding documentation',               3),
  ('premium', 'payroll', 'BCEA compliance review',                  4)
on conflict (tier_slug, service_slug, inclusion) do nothing;

-- ─── Testimonials (placeholder rows — replace via Supabase Table Editor) ──────

insert into public.testimonials (name, role, business, quote, display_order)
values
  ('[Client Name]', 'CEO',                '[Company]', '[Placeholder testimonial quote about Capucor''s value.]',                        1),
  ('[Client Name]', 'Financial Director', '[Company]', '[Placeholder testimonial about switching to Capucor.]',                          2),
  ('[Client Name]', 'Founder',            '[Company]', '[Placeholder testimonial about the tech stack and financial visibility.]',        3)
on conflict do nothing;
