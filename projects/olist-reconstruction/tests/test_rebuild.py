"""Tests for aggregate-only Olist dashboard generation; no private workbook in CI."""
import importlib.util
from pathlib import Path
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / "rebuild.py"
spec = importlib.util.spec_from_file_location("olist_rebuild", SCRIPT)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

def bucket(month, state, orders, items, value, late):
    return {
        "month": month, "state": state, "orders": orders,
        "delivered": orders, "late": late, "deliveryEligible": orders,
        "reviewed": orders, "reviewSum": orders * 4,
        "pricedOrders": orders, "itemValue": value,
        "freightValue": 0.0, "itemCount": items,
    }

class RebuildTests(unittest.TestCase):
    def setUp(self):
        self.aggregate = {
            "monthlyByCustomerState": [
                bucket("2017-01", "SP", 44550, 50000, 10.0, 8),
                bucket("2018-02", "RJ", 54032, 60929, 20.0, 12),
            ],
            "categoryByCustomerState": [
                {"month": "2017-01", "state": "SP",
                 "dimension": "health_beauty", "itemValue": 10.0},
                {"month": "2018-02", "state": "RJ",
                 "dimension": "health_beauty", "itemValue": 20.0},
            ],
        }

    def test_reconciled_aggregate_and_no_ids(self):
        output = module.build_typescript(self.aggregate)
        self.assertIn('"all": [98582,98582,20,98582', output)
        self.assertIn('["health_beauty",30.0,10.0,20.0]', output)
        self.assertIn('["Other states",0,0,0', output)
        self.assertNotIn("customer_id", output)
        self.assertNotIn("order_id", output)

    def test_changed_workbook_count_is_rejected(self):
        self.aggregate["monthlyByCustomerState"][0]["orders"] -= 1
        with self.assertRaises(AssertionError):
            module.build_typescript(self.aggregate)

    def test_missing_category_value_is_rejected(self):
        self.aggregate["categoryByCustomerState"][0]["itemValue"] -= 1
        with self.assertRaises(AssertionError):
            module.build_typescript(self.aggregate)

if __name__ == "__main__":
    unittest.main()
