class JacobiSolver {
    constructor(koefisien, konstan, tebakanAwal, maksIterasi, toleransi) {
        this.koefisien = koefisien;
        this.konstan = konstan;
        this.tebakanAwal = tebakanAwal.slice();
        this.maksIterasi = maksIterasi;
        this.toleransi = toleransi;
        this.n = koefisien.length;
    }

    solve() {
        let x = this.tebakanAwal.slice();
        let iterationsData = [];

        for (let k = 0; k < this.maksIterasi; k++) {
            const x_baru = new Array(this.n).fill(0);

            for (let i = 0; i < this.n; i++) {
                let jumlah = 0;
                for (let j = 0; j < this.n; j++) {
                    if (j !== i) {
                        jumlah += this.koefisien[i][j] * x[j];
                    }
                }
                x_baru[i] = (this.konstan[i] - jumlah) / this.koefisien[i][i];
            }

            let error = 0;
            let allError = []
            for (let i = 0; i < this.n; i++) {
                allError.push(Math.abs(x_baru[i] - x[i]));
                error = Math.max(error, Math.abs(x_baru[i] - x[i]));
            }

            iterationsData.push({ iteration: k + 1, error: { error, allError }, x: { baru: [...x_baru], lama: [...x] } });

            if (error < this.toleransi) {
                return { solution: x_baru, iterationsData };
            }

            x = x_baru;
        }

        return { solution: null, iterationsData };
    }
}

export default JacobiSolver;