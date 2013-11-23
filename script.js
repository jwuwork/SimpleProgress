function progress(value) {
    var el = $("#progress");
    if (el.length == 0) {
        el = $("<div id='progress' class='progress'></div>").appendTo("body");
    }

    el.animate({ width: value + "%" }, 500, function() {
        if (value == 100) {
            el.remove();
        }
    });
}

$("#sample-form").submit(function (event) {
    event.preventDefault();

	$.ajax({
		url: this.action,
		type: this.method,
		data: $(this).serialize(),
		xhr: function () {
			var xhr = new window.XMLHttpRequest();

			// Upload Progress
			xhr.upload.addEventListener("progress", function (evt) {
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					progress(percentComplete * 50);
				}
			}, false);

			// Download Progress
			xhr.addEventListener("progress", function (evt) {
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					progress(50 + percentComplete * 50);
				}
			}, false);

			return xhr;
		}
	});
});
