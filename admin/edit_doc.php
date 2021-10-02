<?php

include('pageConstract/header.php');

$id = $_GET['id'];

$kid = $db->get_one('kids', $id);

$docs = $db->get_all('docs');
//dd($kid);


?>

<div class="container">
    <div class="row">
        <div class="col-lg-8 col-12">
            <h2>Документы - <?php echo $kid['name']?></h2>
            <hr>
            <form action="kid_add_doc.php?id=<?php echo $id ?>" method="POST" enctype="multipart/form-data"> <!--enctype="multipart/form-data"-->
                <input class="form-control mb-3" type="file" name="docs">
                <!--<input class="form-control mb-3" type="file" name="avatar">-->
                <button type="submit" class="btn btn-primary mb-3">Обновить</button>
            </form>
        </div>
        <!-- /.col-lg-8 col-12 -->
        <div class="col-12 col-lg-4 pt-4">
            <span class="d-block mb-4">Уведомления:</span>
            <?php
            if(!empty($_SESSION['alert'])){ ?>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong><?php echo $_SESSION['alert'] ?></strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <?php }
            unset($_SESSION['alert']);
            ?>
        </div>
        <!-- /.col-12 col-lg-4 -->
    </div>
    <!-- /.row -->
</div>
<!-- /.container -->
