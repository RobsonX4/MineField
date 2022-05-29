class MinefieldService {
	constructor($http, API_BASE_URL) {
		this.$http = $http;
		this.API_BASE_URL = API_BASE_URL + "/v1/game";
	}

	getGameLevels() {
		return this.$http({
			method: "GET",
			url: this.API_BASE_URL + "/levels",
		});
	}

	create(config) {
		return this.$http({
			method: "POST",
			url: this.API_BASE_URL,
			data: config,
		});
	}

	play(x, y) {
		return this.$http({
			method: "POST",
			url: this.API_BASE_URL + "/play",
			data: { x, y },
		});
	}
}

angular.module("app").service("minefieldService", MinefieldService);
