"""Independent, reproducible analysis of Plotly's public 244-bill tips sample.
Usage: pip install -r requirements.txt && python analyse.py
Outputs: output/summary.csv and output/service_period.png.
"""
from pathlib import Path
import pandas as pd
from plotly import data as plotly_data
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'output'
EXPECTED = {'total_bill', 'tip', 'sex', 'smoker', 'day', 'time', 'size'}


def analyse(df: pd.DataFrame) -> pd.DataFrame:
    if set(df.columns) != EXPECTED:
        raise ValueError(f'Unexpected columns: {sorted(df.columns)}')
    if len(df) != 244:
        raise ValueError('The expected 244-bill public example dataset was not loaded.')
    if df.isna().any().any():
        raise ValueError('Missing values present; check input before analysis.')
    if (df[['total_bill', 'tip', 'size']] <= 0).any().any():
        raise ValueError('Non-positive monetary value or party size detected.')
    if not df['time'].isin(['Lunch', 'Dinner']).all():
        raise ValueError('Unexpected service period.')
    if not df['day'].isin(['Thur', 'Fri', 'Sat', 'Sun']).all():
        raise ValueError('Unexpected day label.')
    if not (df['tip'] <= df['total_bill']).all():
        raise ValueError('Tip greater than bill; inspect input first.')

    clean = df.assign(
        tip_rate=df['tip'] / df['total_bill'],
        bill_per_cover=df['total_bill'] / df['size'],
    )
    period = clean.groupby('time').agg(
        bills=('total_bill', 'size'),
        average_bill=('total_bill', 'mean'),
        average_bill_per_cover=('bill_per_cover', 'mean'),
        average_tip=('tip', 'mean'),
        median_tip_rate=('tip_rate', 'median'),
        average_party_size=('size', 'mean'),
    )
    period = period.reindex(['Lunch', 'Dinner'])
    assert int(period['bills'].sum()) == len(clean)
    return period


def main() -> None:
    OUT.mkdir(exist_ok=True)
    frame = plotly_data.tips()
    summary = analyse(frame)
    summary.to_csv(OUT / 'summary.csv', float_format='%.4f')

    fig, ax = plt.subplots(figsize=(7.2, 4.4))
    summary['average_bill_per_cover'].plot.bar(ax=ax)
    ax.set(title='Average bill per cover by service period',
           ylabel='Bill amount (dataset units)', xlabel='')
    ax.tick_params(axis='x', rotation=0)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    fig.tight_layout()
    fig.savefig(OUT / 'service_period.png', dpi=175)
    plt.close(fig)
    print(summary.round(3).to_string())
    print(f'Outputs: {OUT / "summary.csv"}, {OUT / "service_period.png"}')


if __name__ == '__main__':
    main()
