from pathlib import Path
import sys
import unittest
from plotly import data as plotly_data

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from analyse import analyse


class AnalysisTests(unittest.TestCase):
    def setUp(self):
        self.frame = plotly_data.tips()

    def test_bill_count_reconciles(self):
        summary = analyse(self.frame)
        self.assertEqual(int(summary['bills'].sum()), 244)
        self.assertEqual(set(summary.index), {'Lunch', 'Dinner'})

    def test_non_positive_bill_fails(self):
        invalid = self.frame.copy()
        invalid.loc[0, 'total_bill'] = 0
        with self.assertRaises(ValueError):
            analyse(invalid)

    def test_missing_value_fails(self):
        invalid = self.frame.copy()
        invalid.loc[0, 'tip'] = float('nan')
        with self.assertRaises(ValueError):
            analyse(invalid)


if __name__ == '__main__':
    unittest.main()
