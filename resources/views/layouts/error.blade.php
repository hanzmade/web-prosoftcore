@if (count($errors) > 0)
    <div class="alert alert-danger">
    	<a href="#" class="close" data-dismiss="alert"
			   aria-label="close">&times;</a>
        <ul>
            @foreach ($errors->all() as $error)
                <li class="enerwise-text-red" style="color:red"><strong>{{ $error }}</strong></li>
            @endforeach
        </ul>
    </div>
@endif