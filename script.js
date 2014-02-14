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

function uploadProgress(evt) {
    if (evt.lengthComputable) {
        progress(evt.loaded / evt.total * 50);
    } else {
        progress(50);
    }
}

function downloadProgress(evt) {
    if (evt.lengthComputable) {
        progress(50 + evt.loaded / evt.total * 50);
    } else {
        progress(100);
    }
}

$("#sample-form").submit(function (event) {
    event.preventDefault();

	$.ajax({
		url: this.action,
		type: this.method,
		data: $(this).serialize(),
		xhr: function () {
			var xhr = new window.XMLHttpRequest();
			xhr.upload.addEventListener("progress", uploadProgress, false);
			xhr.addEventListener("progress", downloadProgress, false);
			return xhr;
		}
	});
});
