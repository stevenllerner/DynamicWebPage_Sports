var sports = ["skiing", "snowboarding", "sledding", "tennis", "golf", "boxing", "swimming", "pole vaulting", "high hurdles", "baseball", "basketball", "football", "soccer", "lacrosse", "hockey"];

function createButtons(){
	for (i=0; i<=(sports.length-1); i++) {
	var a = $("<button class='sbtn btn_i'>").text(sports[i]);
	$(".sButton").append(a);
	$(".btn_i").css({"margin": "5px", "background-color": "blue", "color": "white"});
	}
	sportClickEvent()
}

function submitNewSport(){
	$("#submit").click(function (){
		event.preventDefault();
		$(".sbtn").remove();
		var b = $("#sName").val().trim();
		console.log(b);
		sports.push(b);
		console.log(sports);
		createButtons();
		$("#sName").val('')
	});
}
function sportClickEvent(){
	$(".sbtn").click(function(){
//		event.preventDefault();
		var sport = $(this).text();
		console.log("here is the sport:", sport);
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+sport+"&api_key=f86cc0c3ea0044b89eddabffd753fb6d&limit=10";
		console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response){
			$(".sPics").empty();
			var results = response.data;
			console.log(response.data);
			var j;
			for (j=0; j<10; j++) {
				var stillPic = response.data[j].images.original_still.url;
				var movingPic = response.data[j].images.original.url;
				// $(".sPics").append(
				// 	'<img class=pic src='+stillPic+' data-still='+stillPic+
				// 	' data-animate='+movingPic+
				// 	' data-state=still width=200px/> <br/> ' +
				// 	'<div>Rating: '+ response.data[j].rating+'</div>'
				// );
				$(".sPics").append(
					`
					<img class=pic src=${stillPic} data-still=${stillPic}
					 data-animate=${movingPic} data-state=still width=200px/> <br/>
					<div>Rating: ${response.data[j].rating}</div>
					`
				);
	//			$(".sPics").append('<img class=pic src='+movingPic+' />');			
			// $(".sRating").html("Rating: " + response.data[j].rating);
			}
			pictureClickEvent();	
		})
	});	
}

function pictureClickEvent(){
	$(".pic").click(function(){
		var state = $(this).attr("data-state");
		if (state === "still"){
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
	    }
	    if (state === "animate"){
	       $(this).attr("src", $(this).attr("data-still"));
	       $(this).attr("data-state", "still");
	    }
	})
}


createButtons();
submitNewSport();
// sportClickEvent();
