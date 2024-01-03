class GaussSeidelSolver {
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
            for (let i = 0; i < this.n; i++) {
                let jumlah = 0;
                for (let j = 0; j < this.n; j++) {
                    if (j !== i) {
                        jumlah += this.koefisien[i][j] * x[j];
                    }
                }
                x[i] = (this.konstan[i] - jumlah) / this.koefisien[i][i];
            }

            let error = this.calculateError(x);

            iterationsData.push({ iteration: k + 1, error, x_baru: [...x] });

            if (error < this.toleransi) {
                return { solution: x, iterationsData };
            }
        }

        return { solution: null, iterationsData };
    }

    calculateError(x) {
        let error = 0;
        for (let i = 0; i < this.n; i++) {
            error = Math.max(error, Math.abs(x[i] - this.tebakanAwal[i]));
        }
        return error;
    }
}

export default GaussSeidelSolver;
